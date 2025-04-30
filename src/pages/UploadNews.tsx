
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, AlertTriangle } from "lucide-react";
import { analyzeText } from "@/services/geminiService";
import NewsAnalysisResult from "@/components/NewsAnalysisResult";
import { toast } from "sonner";

const UploadNews = () => {
  const [newsText, setNewsText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyzeText = async () => {
    if (!newsText.trim() || newsText.length < 20) {
      toast.error("Please enter more text for accurate analysis");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const result = await analyzeText(newsText);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing news:", error);
      toast.error("Failed to analyze text. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (file.type !== "text/plain" && !file.type.includes("text")) {
      toast.error("Please upload a text file");
      return;
    }
    
    try {
      const text = await file.text();
      setNewsText(text);
      toast.success("File content loaded successfully");
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("Failed to read file");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          <span className="truth px-2 py-1">Truth</span>
          <span className="mx-1">/</span>
          <span className="chaos px-2 py-1">Chaos</span>
          <span className="ml-2">News Analysis</span>
        </h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload & Analyze News</CardTitle>
            <CardDescription>
              Paste news content or upload a text file to detect if it's real or fake
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="paste">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="paste" className="flex items-center">
                  <FileText size={16} className="mr-2" />
                  Paste Text
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center">
                  <Upload size={16} className="mr-2" />
                  Upload File
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="paste" className="mt-0">
                <Textarea
                  value={newsText}
                  onChange={(e) => setNewsText(e.target.value)}
                  placeholder="Paste news article content here..."
                  className="min-h-[200px]"
                  disabled={isAnalyzing}
                />
              </TabsContent>
              
              <TabsContent value="upload" className="mt-0">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload size={36} className="mx-auto text-gray-400 mb-2" />
                  <p className="mb-4 text-gray-500">Upload a text file (.txt) containing news content</p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".txt,.text,text/plain"
                    onChange={handleFileUpload}
                    disabled={isAnalyzing}
                  />
                  <Button asChild variant="secondary">
                    <label htmlFor="file-upload" className="cursor-pointer">Select File</label>
                  </Button>
                </div>
              </TabsContent>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center text-amber-600 text-sm">
                  <AlertTriangle size={16} className="mr-1" />
                  <span>For best results, include full article text</span>
                </div>
                <Button 
                  onClick={handleAnalyzeText} 
                  disabled={isAnalyzing || !newsText.trim() || newsText.length < 20}
                  className="bg-chaos hover:bg-chaos-orange"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Content"}
                </Button>
              </div>
            </Tabs>
            
            {analysisResult && (
              <NewsAnalysisResult result={analysisResult} />
            )}
            
            {isAnalyzing && (
              <NewsAnalysisResult result={{
                text: "",
                isFake: null,
                confidenceScore: null,
                reasoning: null
              }} isLoading={true} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadNews;
