
import React from "react";
import { ShieldCheck, ShieldX, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GeminiResponse } from "@/services/geminiService";

interface NewsAnalysisResultProps {
  result: GeminiResponse;
  isLoading?: boolean;
}

const NewsAnalysisResult: React.FC<NewsAnalysisResultProps> = ({ result, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="animate-pulse bg-gray-200 h-7 w-3/4 rounded"></CardTitle>
          <CardDescription className="animate-pulse bg-gray-200 h-5 w-1/2 rounded"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse bg-gray-200 h-4 w-full rounded mb-2"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-11/12 rounded mb-2"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-10/12 rounded mb-2"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-9/12 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (!result || (!result.isFake && result.isFake !== false)) {
    return null;
  }

  const confidenceScore = result.confidenceScore || 50;
  const progressClassName = result.isFake ? "bg-chaos/30" : "bg-green-500/30";
  const indicatorClassName = result.isFake ? "bg-chaos" : "bg-green-500";

  return (
    <Card className={`w-full mt-6 border-4 ${
      result.isFake ? "border-chaos" : "border-green-500"
    }`}>
      <CardHeader className={`${
        result.isFake ? "bg-chaos/10" : "bg-green-500/10"
      }`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center">
            {result.isFake ? (
              <>
                <ShieldX size={28} className="mr-2 text-chaos" />
                <span className="text-chaos font-bold">FAKE NEWS DETECTED</span>
              </>
            ) : (
              <>
                <ShieldCheck size={28} className="mr-2 text-green-600" />
                <span className="text-green-600 font-bold">CREDIBLE CONTENT</span>
              </>
            )}
          </CardTitle>
          {result.confidenceScore && (
            <div className="text-sm font-medium">
              Confidence: {Math.round(confidenceScore)}%
            </div>
          )}
        </div>
        <Progress 
          value={confidenceScore} 
          className={`h-2 ${progressClassName}`}
        />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="whitespace-pre-wrap">{result.reasoning || result.text}</div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex flex-col items-start text-sm text-muted-foreground pt-4">
        <div className="flex items-center">
          <AlertTriangle size={14} className="mr-2" />
          <span>AI analysis is for informational purposes only. Always verify with trusted sources.</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewsAnalysisResult;
