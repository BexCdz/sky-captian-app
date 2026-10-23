export const isSpeechSupported =
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  typeof SpeechSynthesisUtterance !== 'undefined'

// Voices that sound warm and clear for kids. Matched loosely against the voice name.
const FRIENDLY = /samantha|karen|moira|tessa|serena|susan|hazel|zira|aria|jenny|libby|sonia|siri|female/i
const POOR = /compact|espeak|novelty|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|pipe organ|trinoids|whisper|zarvox/i

// Offline is the hard requirement: network voices (Google, Microsoft "Natural")
// are silent in airplane mode, so on-device voices always win.
export function scoreVoice(voice, lang) {
  const voiceLang = voice.lang?.toLowerCase().replace('_', '-') ?? ''
  if (!voiceLang.startsWith(lang.toLowerCase().slice(0, 2))) return -Infinity

  let score = 0
  if (voice.localService) score += 100
  if (voiceLang === lang.toLowerCase()) score += 10
  if (/enhanced|premium/i.test(voice.name)) score += 20
  if (FRIENDLY.test(voice.name)) score += 15
  if (POOR.test(voice.name)) score -= 50
  return score
}

export function pickVoice(voices, lang = 'en') {
  let best = null
  let bestScore = -Infinity
  for (const voice of voices) {
    const score = scoreVoice(voice, lang)
    if (score > bestScore) {
      best = voice
      bestScore = score
    }
  }
  return best
}

// Short sentences sound more natural with a small gap, and very long utterances
// get cut off by some browsers.
function splitSentences(text) {
  return text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [text]
}

let currentToken = 0

// Browsers (Chrome especially) fill the voice list asynchronously. Wait briefly
// so the very first prompt doesn't fall back to the default voice.
function loadVoices(timeoutMs = 600) {
  const synth = window.speechSynthesis
  const now = synth.getVoices()
  if (now.length) return Promise.resolve(now)
  return new Promise((resolve) => {
    const finish = () => {
      synth.removeEventListener('voiceschanged', finish)
      clearTimeout(timer)
      resolve(synth.getVoices())
    }
    const timer = setTimeout(finish, timeoutMs)
    synth.addEventListener('voiceschanged', finish)
  })
}

if (isSpeechSupported) window.speechSynthesis.getVoices()

export function speakText(text, { lang = 'en', rate = 0.88, pitch = 1.1, onEnd } = {}) {
  if (!isSpeechSupported || !text) {
    onEnd?.()
    return
  }
  const synth = window.speechSynthesis
  synth.cancel()
  const token = ++currentToken
  const sentences = splitSentences(text)

  const speakAt = (i, voice) => {
    if (token !== currentToken) return
    if (i >= sentences.length) {
      onEnd?.()
      return
    }
    const utterance = new SpeechSynthesisUtterance(sentences[i])
    if (voice) utterance.voice = voice
    utterance.lang = voice?.lang ?? lang
    utterance.rate = rate
    utterance.pitch = pitch
    const next = () => setTimeout(() => speakAt(i + 1, voice), 180)
    utterance.onend = next
    utterance.onerror = next
    synth.speak(utterance)
  }

  loadVoices().then((voices) => speakAt(0, pickVoice(voices, lang)))
}

export function cancelSpeech() {
  currentToken += 1
  if (isSpeechSupported) window.speechSynthesis.cancel()
}
