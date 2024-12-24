export async function translateText(
    text: string,
    sourceLang: string,
    targetLang: string
  ): Promise<string> {
    const response = await fetch(
      `https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`
    );
    if (!response.ok) throw new Error('Çeviri başarısız oldu.');
    const data = await response.json();
    return data.translation;
  }
  