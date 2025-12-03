import { Palette, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const ColorizerHeader = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Manga Colorizer
              </h1>
              <p className="text-xs text-gray-500">Powered by Gemini 2.5 Flash</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <a
              href="https://github.com/filiksyos/manga-colorizer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ColorizerHeader;