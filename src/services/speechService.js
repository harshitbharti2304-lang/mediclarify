// Speech Synthesis Service supporting Web Speech API and ElevenLabs TTS
// Strictly localizes audio output by mapping language codes to BCP-47 and ElevenLabs multilingual codes

export function getBcp47Lang(langCode = 'en') {
  const map = {
    hi: 'hi-IN',
    pa: 'pa-IN',
    bn: 'bn-IN',
    mr: 'mr-IN',
    es: 'es-ES',
    en: 'en-US'
  };
  if (map[langCode]) return map[langCode];
  if (langCode.includes('-')) return langCode;
  return `${langCode}-${langCode.toUpperCase()}`;
}

export function getElevenLabsLang(langCode = 'en') {
  if (!langCode) return 'en';
  if (langCode.includes('-')) {
    return langCode.split('-')[0].toLowerCase();
  }
  return langCode.toLowerCase();
}

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.audioElement = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.onStateChangeCallbacks = new Set();
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.add(callback);
    return () => this.onStateChangeCallbacks.delete(callback);
  }

  notifyStateChange() {
    this.onStateChangeCallbacks.forEach(cb => cb({
      isPlaying: this.isPlaying,
      isPaused: this.isPaused
    }));
  }

  // Get available voices from browser
  getVoices() {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  // Find best matching voice for language code
  findVoiceForLanguage(langCode, bcp47Code) {
    const voices = this.getVoices();
    if (!voices.length) return null;

    const bcp47 = (bcp47Code || getBcp47Lang(langCode)).toLowerCase();
    const shortCode = (langCode || 'en').toLowerCase().split('-')[0];

    // 1. Exact BCP-47 match
    const exact = voices.find(v => v.lang.toLowerCase() === bcp47);
    if (exact) return exact;

    // 2. Language-specific matching
    if (shortCode === 'hi') {
      const hiVoice = voices.find(v => v.lang.toLowerCase().startsWith('hi') || v.name.toLowerCase().includes('hindi'));
      if (hiVoice) return hiVoice;
      const inVoice = voices.find(v => v.lang.includes('IN'));
      if (inVoice) return inVoice;
    } else if (shortCode === 'pa') {
      const paVoice = voices.find(v =>
        v.lang.toLowerCase().startsWith('pa') ||
        v.name.toLowerCase().includes('punjabi') ||
        v.name.toLowerCase().includes('gurmukhi')
      );
      if (paVoice) return paVoice;
      // Fallback to Hindi or Indian English voice for phonetics
      const hiVoice = voices.find(v => v.lang.toLowerCase().startsWith('hi'));
      if (hiVoice) return hiVoice;
      const inVoice = voices.find(v => v.lang.includes('IN'));
      if (inVoice) return inVoice;
    } else if (shortCode === 'bn') {
      const bnVoice = voices.find(v => v.lang.toLowerCase().startsWith('bn') || v.name.toLowerCase().includes('bengali') || v.name.toLowerCase().includes('bangla'));
      if (bnVoice) return bnVoice;
      const inVoice = voices.find(v => v.lang.includes('IN'));
      if (inVoice) return inVoice;
    } else if (shortCode === 'mr') {
      const mrVoice = voices.find(v => v.lang.toLowerCase().startsWith('mr') || v.name.toLowerCase().includes('marathi'));
      if (mrVoice) return mrVoice;
      const hiVoice = voices.find(v => v.lang.toLowerCase().startsWith('hi'));
      if (hiVoice) return hiVoice;
      const inVoice = voices.find(v => v.lang.includes('IN'));
      if (inVoice) return inVoice;
    } else if (shortCode === 'es') {
      const esVoice = voices.find(v => v.lang.toLowerCase().startsWith('es') || v.name.toLowerCase().includes('spanish'));
      if (esVoice) return esVoice;
    } else {
      const enVoice = voices.find(v => (v.lang.startsWith('en-IN') || v.lang.startsWith('en-US')) && !v.name.includes('David'));
      if (enVoice) return enVoice;
    }

    // 3. Prefix match
    const prefixMatch = voices.find(v => v.lang.toLowerCase().startsWith(shortCode));
    if (prefixMatch) return prefixMatch;

    return voices.find(v => v.default) || voices[0];
  }

  // Speak using Web Speech API or ElevenLabs
  async speak({ text, lang = 'en', rate = 0.95, pitch = 1.0, elevenLabsKey = '', voiceId = '21m00Tcm4TlvDq8ikWAM' }) {
    this.stop();

    const targetBcp47 = getBcp47Lang(lang);
    const targetElevenLabs = getElevenLabsLang(lang);

    console.log(`[SpeechService] Initiating speech synthesis: lang='${lang}' -> BCP-47='${targetBcp47}', ElevenLabs='${targetElevenLabs}'`);

    // If an ElevenLabs API key is provided, try ElevenLabs TTS first with language_code parameter
    if (elevenLabsKey && elevenLabsKey.trim().length > 10) {
      try {
        const success = await this.speakElevenLabs({
          text,
          lang: targetElevenLabs,
          elevenLabsKey,
          voiceId
        });
        if (success) return;
      } catch (err) {
        console.warn('ElevenLabs playback failed, falling back to Web Speech API:', err);
      }
    }

    // Default: Browser Web Speech API
    if (!this.synth) {
      console.error('Web Speech API is not supported in this browser.');
      return;
    }

    // Cancel any hanging synthesis
    this.synth.cancel();

    // Create Utterance
    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Set BCP-47 language tag strictly
    utterance.lang = targetBcp47;
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Pick best matching voice
    const voice = this.findVoiceForLanguage(lang, targetBcp47);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.notifyStateChange();
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notifyStateChange();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notifyStateChange();
    };

    this.synth.speak(utterance);
  }

  pause() {
    if (this.synth && this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notifyStateChange();
    }
  }

  resume() {
    if (this.synth && this.isPlaying && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notifyStateChange();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.notifyStateChange();
  }

  // ElevenLabs TTS REST API with strict language_code passing
  async speakElevenLabs({ text, lang = 'en', elevenLabsKey, voiceId }) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsKey
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        language_code: getElevenLabsLang(lang),
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs HTTP ${response.status}: ${await response.text()}`);
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    this.audioElement = audio;

    this.isPlaying = true;
    this.isPaused = false;
    this.notifyStateChange();

    audio.onended = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.audioElement = null;
      this.notifyStateChange();
    };

    audio.onerror = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.audioElement = null;
      this.notifyStateChange();
    };

    await audio.play();
    return true;
  }
}

export const speechService = new SpeechService();
