import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MangaUploaderProps {
  onImageUpload: (imageData: string) => void;
}

const MangaUploader = ({ onImageUpload }: MangaUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-xl p-12 transition-all duration-200 cursor-pointer",
        "bg-white/50 backdrop-blur-sm hover:bg-white/80",
        isDragging
          ? "border-purple-500 bg-purple-50/50 scale-105"
          : "border-gray-300 hover:border-purple-400"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className={cn(
          "p-4 rounded-full transition-colors",
          isDragging ? "bg-purple-100" : "bg-gray-100"
        )}>
          {isDragging ? (
            <Upload className="w-12 h-12 text-purple-600" />
          ) : (
            <ImageIcon className="w-12 h-12 text-gray-600" />
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-700">
            {isDragging ? "Drop your manga here" : "Upload Manga Image"}
          </p>
          <p className="text-sm text-gray-500">
            Drag & drop or click to browse
          </p>
          <p className="text-xs text-gray-400">
            Supports: JPG, PNG, WebP
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center pt-4">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
            ✨ AI-Powered
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
            🎨 Instant Results
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            🚀 Free to Use
          </span>
        </div>
      </div>
    </div>
  );
};

export default MangaUploader;