import { useState } from "react";
import { ArrowLeft, Download, Loader2, Sparkles } from "lucide-react";
import ColorizerHeader from "@/components/ColorizerHeader";
import MangaUploader from "@/components/MangaUploader";
import PreviewArea from "@/components/PreviewArea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { colorizeImage } from "@/utils/imageUtils";

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [colorizedImage, setColorizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (imageData: string) => {
    setOriginalImage(imageData);
    setIsProcessing(true);
    setShowResult(false);

    try {
      const result = await colorizeImage(imageData);
      setColorizedImage(result);
      setShowResult(true);
      toast({
        title: "Success! 🎨",
        description: "Your manga has been colorized!",
      });
    } catch (error) {
      console.error('Colorization error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to colorize manga. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (colorizedImage) {
      const link = document.createElement('a');
      link.href = colorizedImage;
      link.download = `colorized-manga-${Date.now()}.png`;
      link.click();
      toast({
        title: "Downloaded! 📥",
        description: "Your colorized manga has been saved.",
      });
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setColorizedImage(null);
    setShowResult(false);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <ColorizerHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Processing State */}
        {isProcessing && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 animate-spin text-purple-600" />
              <Sparkles className="w-8 h-8 text-pink-500 absolute top-0 right-0 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Colorizing Your Manga...</h2>
              <p className="text-gray-600">AI is working its magic ✨</p>
            </div>
          </div>
        )}

        {/* Result View */}
        {showResult && colorizedImage && !isProcessing && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Colorize Another
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700">Original</h3>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <img
                    src={originalImage!}
                    alt="Original manga"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Colorized */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  Colorized <Sparkles className="w-5 h-5 text-purple-600" />
                </h3>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <img
                    src={colorizedImage}
                    alt="Colorized manga"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload View */}
        {!originalImage && !isProcessing && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Transform Your Manga
              </h1>
              <p className="text-lg text-gray-600">
                Upload a black & white manga page and watch AI bring it to life in color
              </p>
            </div>
            <MangaUploader onImageUpload={handleImageUpload} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;