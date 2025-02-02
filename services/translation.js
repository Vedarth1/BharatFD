const {translate} = require('@vitalets/google-translate-api');

const translator = async (text, targetLang) => {
  try {
    const { text: translatedText } = await translate(text, { to: targetLang });
    return translatedText;
  } catch (error) {
    console.error(`Error translating to ${targetLang}:`, error);
    return null;
  }
};

module.exports={ translator };