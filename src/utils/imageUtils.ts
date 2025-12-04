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

    // Check response status and content before parsing
    const contentType = response.headers.get('content-type');
    const responseText = await response.text();
    
    if (!response.ok) {
      // Try to parse error response, but handle empty/invalid JSON
      let errorData;
      if (responseText && contentType?.includes('application/json')) {
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          throw new Error(`API error (${response.status}): ${responseText || 'Empty response'}`);
        }
      } else {
        throw new Error(`API error (${response.status}): ${responseText || 'Empty response'}`);
      }
      console.error('API Error:', errorData);
      throw new Error(errorData.error || 'Failed to colorize image');
    }

    // Parse successful response
    if (!responseText) {
      throw new Error('Empty response from server');
    }
    
    if (!contentType?.includes('application/json')) {
      console.error('Unexpected content type:', contentType);
      console.error('Response text:', responseText.substring(0, 200));
      throw new Error('Server returned non-JSON response');
    }
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Response text:', responseText.substring(0, 500));
      throw new Error('Invalid JSON response from server');
    }
    console.log('API Response received');
    console.log('Response structure:', JSON.stringify(data, null, 2).substring(0, 1000));

    // Extract the generated image from response
    // Gemini API returns camelCase (inlineData, mimeType) not snake_case (inline_data, mime_type)
    let imagePart = null;
    let responseImageData = null;
    let responseMimeType = 'image/png';
    
    if (data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0];
      
      // Check if content.parts exists
      if (candidate.content?.parts) {
        const parts = candidate.content.parts;
        
        // Try camelCase first (inlineData)
        imagePart = parts.find((part: any) => part.inlineData || part.inline_data);
        
        if (imagePart) {
          // Handle both camelCase and snake_case
          const inlineData = imagePart.inlineData || imagePart.inline_data;
          if (inlineData) {
            responseImageData = inlineData.data;
            responseMimeType = inlineData.mimeType || inlineData.mime_type || 'image/png';
          }
        }
      }
      
      // Also check if inlineData/inline_data is directly in the candidate
      if (!responseImageData && (candidate.inlineData || candidate.inline_data)) {
        const inlineData = candidate.inlineData || candidate.inline_data;
        responseImageData = inlineData.data;
        responseMimeType = inlineData.mimeType || inlineData.mime_type || 'image/png';
      }
      
      // Check if parts array contains inlineData/inline_data directly
      if (!responseImageData && Array.isArray(candidate.parts)) {
        imagePart = candidate.parts.find((part: any) => part.inlineData || part.inline_data);
        if (imagePart) {
          const inlineData = imagePart.inlineData || imagePart.inline_data;
          responseImageData = inlineData.data;
          responseMimeType = inlineData.mimeType || inlineData.mime_type || 'image/png';
        }
      }
    }
    
    // Check alternative structure: data.parts directly
    if (!responseImageData && data.parts) {
      imagePart = Array.isArray(data.parts) 
        ? data.parts.find((part: any) => part.inlineData || part.inline_data)
        : (data.parts.inlineData || data.parts.inline_data) ? data.parts : null;
      
      if (imagePart) {
        const inlineData = imagePart.inlineData || imagePart.inline_data;
        responseImageData = inlineData?.data;
        responseMimeType = inlineData?.mimeType || inlineData?.mime_type || 'image/png';
      }
    }
    
    // Check if inlineData/inline_data is at root level
    if (!responseImageData && (data.inlineData || data.inline_data)) {
      const inlineData = data.inlineData || data.inline_data;
      responseImageData = inlineData.data;
      responseMimeType = inlineData.mimeType || inlineData.mime_type || 'image/png';
    }
    
    if (responseImageData) {
      return `data:${responseMimeType};base64,${responseImageData}`;
    }

    // Log the full response structure for debugging
    console.error('Full response structure:', JSON.stringify(data, null, 2));
    throw new Error('No image data in response. Check console for response structure.');
  } catch (error) {
    console.error('Colorization error:', error);
    throw error instanceof Error ? error : new Error('Failed to colorize manga');
  }
};