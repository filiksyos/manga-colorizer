/**
 * Convert image to base64 format for API
 */
export const imageToBase64 = async (imageUrl: string): Promise<string> => {
  if (imageUrl.startsWith('data:')) {
    // Already base64
    return imageUrl.split(',')[1];
  }
  
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Colorize manga image using Gemini API
 */
export const colorizeImage = async (imageData: string): Promise<string> => {
  try {
    // Extract base64 data
    const base64Data = imageData.includes('base64,') 
      ? imageData.split('base64,')[1] 
      : imageData;

    // Determine mime type
    const mimeType = imageData.match(/data:([^;]+);/)?.[1] || 'image/jpeg';

    const requestBody = {
      contents: [{
        parts: [
          {
            text: "Colorize this black and white manga image. Add vibrant, anime-style colors while preserving all the original line art, details, and composition. Use appropriate colors for skin tones, hair, clothing, and backgrounds. Make it look like a professionally colored manga page. Return ONLY the colorized image without any text or explanations."
          },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      }
    };

    console.log('Sending colorization request...');
    
    const response = await fetch('/api/colorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error || 'Failed to colorize image');
    }

    const data = await response.json();
    console.log('API Response received');

    // Extract the generated image from response
    if (data.candidates && data.candidates[0]?.content?.parts) {
      const parts = data.candidates[0].content.parts;
      
      // Look for inline_data in the response
      const imagePart = parts.find((part: any) => part.inline_data);
      
      if (imagePart?.inline_data?.data) {
        const { mime_type, data: imageBase64 } = imagePart.inline_data;
        return `data:${mime_type};base64,${imageBase64}`;
      }
    }

    throw new Error('No image data in response');
  } catch (error) {
    console.error('Colorization error:', error);
    throw error instanceof Error ? error : new Error('Failed to colorize manga');
  }
};