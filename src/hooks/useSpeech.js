import { useCallback, useEffect, useRef, useState } from 'react'
import { cancelSpeech, isSpeechSupported, speakText } from '../utils/speech'

export default function useSpeech({ lang = 'en' } = {}) {
  const [speaking, setSpeaking] = useState(false)
  const activeRef = useRef(0)

  const stop = useCallback(() => {
    activeRef.current += 1
    cancelSpeech()
    setSpeaking(false)
  }, [])

  const speak = useCallback(
    (text, onEnd) => {
      const id = ++activeRef.current
      setSpeaking(true)
      speakText(text, {
        lang,
        onEnd: () => {
          // Ignore the end event of an utterance that was replaced or cancelled.
          if (id !== activeRef.current) return
          setSpeaking(false)
          onEnd?.()
        },
      })
    },
    [lang],
  )

  useEffect(() => {
    if (!isSpeechSupported) return
    // Chrome loads voices asynchronously; touching the list early warms it.
    window.speechSynthesis.getVoices()
    return () => cancelSpeech()
  }, [])

  return { speak, stop, speaking, supported: isSpeechSupported }
}
