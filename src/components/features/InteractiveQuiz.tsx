
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  onGenerateNew: () => void;
}

export function InteractiveQuiz({ questions, onGenerateNew }: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (option: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: option }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>
            You scored {score} out of {questions.length}!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className={cn("p-3 rounded-lg border", userAnswers[index] === q.answer ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10")}>
              <p className="font-semibold">{index + 1}. {q.question}</p>
              <p className="text-sm text-muted-foreground mt-2">Your answer: {userAnswers[index] || "Not answered"}</p>
              <p className="text-sm mt-1">
                {userAnswers[index] === q.answer ? (
                  <span className="flex items-center text-green-600"><CheckCircle2 className="h-4 w-4 mr-1" /> Correct!</span>
                ) : (
                  <span className="flex items-center text-red-600"><XCircle className="h-4 w-4 mr-1" /> Incorrect. The correct answer is: {q.answer}</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-2"><em>Explanation: {q.explanation}</em></p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="gap-2">
          <Button onClick={handleRetry}>Try Again</Button>
          <Button variant="outline" onClick={onGenerateNew}><RefreshCw className="mr-2 h-4 w-4" />Generate New Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1}/{questions.length}</CardTitle>
        <Progress value={progress} className="mt-2" />
        <CardDescription className="pt-4 text-lg">{currentQuestion.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={userAnswers[currentQuestionIndex]}
          onValueChange={handleAnswerSelect}
          className="space-y-2"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex(i => i - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        {currentQuestionIndex < questions.length - 1 ? (
          <Button onClick={() => setCurrentQuestionIndex(i => i + 1)}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={Object.keys(userAnswers).length !== questions.length}>
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
