import { Sparkles } from "lucide-react";

interface PreviewAreaProps {
  originalImage?: string | null;
  colorizedImage?: string | null;
  isProcessing?: boolean;
}

const PreviewArea = ({ originalImage, colorizedImage, isProcessing }: PreviewAreaProps) => {
  if (!originalImage && !colorizedImage) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] bg-white/50 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-center space-y-3">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto" />
          <p className="text-gray-500">Your colorized manga will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {originalImage && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">Original</h3>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={originalImage}
              alt="Original manga"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      {colorizedImage && (
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
      )}
    </div>
  );
};

export default PreviewArea;