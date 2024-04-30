// pages/index.js
import Head from 'next/head';
import QuizContainer from './QuizContainer';
import {Footer} from "@/app/Footer";
import React from "react";

export default function Home() {
  return (
      <div>
        <Head>
          <title>Quiz App</title>
        </Head>
          <div className="flex flex-col h-screen justify-between">
            <QuizContainer />
            <Footer />
          </div>
      </div>
  );
}