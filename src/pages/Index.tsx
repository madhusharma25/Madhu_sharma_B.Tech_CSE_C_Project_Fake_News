
import React from "react";
import { Link } from "react-router-dom";
import { Newspaper, ShieldCheck, AlertTriangle, MessageCircleQuestion, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="block">Uncover the</span> 
                <span className="inline-block truth px-4 py-2 my-2">TRUTH</span>
                <span className="block">from the</span>
                <span className="inline-block chaos px-4 py-2 my-2">CHAOS</span>
              </h1>
              <p className="text-lg mb-8 text-gray-700">
                Our AI-powered platform helps you detect fake news and verify information
                using advanced machine learning and the power of Google's Gemini AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-chaos hover:bg-chaos-orange">
                  <Link to="/chat">
                    <MessageCircleQuestion className="mr-2" />
                    Chat with AI
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/upload">
                    <Upload className="mr-2" />
                    Upload News
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 bg-chaos-dark flex items-center justify-center p-8">
              <div className="relative animate-paper-float">
                <div className="absolute -top-3 -left-3 w-full h-full bg-newsprint-light transform rotate-3"></div>
                <div className="absolute -top-1 -left-1 w-full h-full bg-peace-gray transform -rotate-1"></div>
                <div className="relative bg-white p-6 transform rotate-1 shadow-md">
                  <Newspaper size={120} className="text-chaos-orange mx-auto" />
                  <div className="mt-4 text-center font-cutout text-xl">
                    FACT vs FICTION
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="transform hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="pt-6 text-center">
              <div className="bg-peace-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircleQuestion size={32} className="text-newsprint" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Chat Analysis</h3>
              <p className="text-gray-600">
                Ask our Gemini-powered AI about any news article or claim to get an instant assessment of its credibility.
              </p>
            </CardContent>
          </Card>
          
          <Card className="transform hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="pt-6 text-center">
              <div className="bg-chaos rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Upload size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Upload & Analyze</h3>
              <p className="text-gray-600">
                Upload news articles or text content for our system to analyze and identify potential misinformation.
              </p>
            </CardContent>
          </Card>
          
          <Card className="transform hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="pt-6 text-center">
              <div className="bg-peace-gray rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} className="text-newsprint" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verification Results</h3>
              <p className="text-gray-600">
                Get detailed results explaining why content may be trustworthy or suspicious based on multiple verification factors.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-chaos-dark text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Detect Fake News?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Start using our AI-powered tools today to separate fact from fiction in the digital age.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-chaos hover:bg-chaos-orange">
            <Link to="/chat">Start Chat Analysis</Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-chaos-dark">
            <Link to="/upload">Upload News Article</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
