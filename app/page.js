// pages/index.js
import Head from 'next/head';
import Quiz from '../app/Quiz';

export default function Home() {
  return (
      <div>
        <Head>
          <title>Quiz App</title>
        </Head>
        <Quiz />
      </div>
  );
}