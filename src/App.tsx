import * as React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

interface TestData {
  data: String[];
  sumFunc: () => void;
}

interface TestQuestion {
  question: String;
  sumFunc: () => void;
}

const App: React.FC = () => {
  const [aguiaCount, setAguiaCount] = useState<number>(0);
  const [loboCount, setLoboCount] = useState<number>(0);
  const [golfinhoCount, setGolfinhoCount] = useState<number>(0);
  const [tubaraoCount, setTubaraoCount] = useState<number>(0);

  const [shuffledQuestions, setShuffledQuestions] = useState<TestQuestion[][]>(
    []
  );
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const dadosAguia = [
    "IDEALISMO",
    "INOVAÇÃO",
    "ANTECIPAÇÃO",
    "COMPLEXIDADE",
    "CURIOSIDADE",
    "QUESTIONAMENTO",
    "DESCOBERTAS",
    "IRRELEVÂNCIA",
    "LIBERDADE",
    "REVOLUÇÃO",
    "ESCOLHA",
    "INDEPENDÊNCIA",
    "AVENTURA",
    "CRIATIVIDADE",
    "ADAPTAÇÃO",
    "DESAFIO",
    "NOVIDADE",
    "DESCONFIANÇA",
    "MUDANÇA",
    "MISTÉRIO",
    "ESTRANHEZA",
    "EFICÁCIA",
    "DESLIGADO",
    "POLÊMICA",
    "MULTIPLICIDADE",
  ];

  const dadosLobo = [
    "METICULOSIDADE",
    "ORGANIZAÇÃO",
    "REGRAS",
    "SISTEMATIZAÇÃO",
    "PLANEJAMENTO",
    "DETALHAMENTO",
    "PREVISÃO",
    "INEVITABILIDADE",
    "CONTROLE",
    "LÓGICA",
    "MELHORIA",
    "ACÚMULO",
    "ORDEM",
    "PONTUALIDADE",
    "CONSISTÊNCIA",
    "ESTRATÉGIA",
    "CONTROLE",
    "PRESENÇÃO",
    "ROTINA",
    "COMPREENSÃO",
    "PERFEIÇÃO",
    "PERÍCIA",
    "GRADATIVO",
    "PRUDÊNCIA",
    "CAUTELA",
  ];

  const dadosGolfinho = [
    "DIVERSÃO",
    "INTEGRAÇÃO",
    "ACORDO",
    "INTERATIVIDADE",
    "RELACIONAMENTO",
    "PARTICIPAÇÃO",
    "NATURALIDADE",
    "SOCIALIZAÇÃO",
    "COMPREENSÃO",
    "TRADIÇÃO",
    "LAZER",
    "ASSISTÊNCIA",
    "COOPERAÇÃO",
    "PARCERIA",
    "EQUIPE",
    "PERCURSO",
    "SOLIDARIEDADE",
    "UNIÃO",
    "AMIZADE",
    "REENCONTRO",
    "ENVOLVIMENTO",
    "EXPERIÊNCIA",
    "JUSTIÇA",
    "COLETIVIDADE",
    "CONJUNTO",
  ];

  const dadosTubarao = [
    "PERSISTÊNCIA",
    "EXECUÇÃO",
    "PERSISTÊNCIA",
    "OBJETIVIDADE",
    "DIREÇÃO",
    "IMPULSIVIDADE",
    "DETERMINAÇÃO",
    "FACILIDADE",
    "PACIÊNCIA",
    "QUANTIDADE",
    "AUTONOMIA",
    "EMPREENDIMENTO",
    "EXECUÇÃO",
    "VANTAGEM",
    "LÍDER",
    "CHEGADA",
    "ATUAÇÃO",
    "ATAQUE",
    "PRODUTIVIDADE",
    "PRESSA",
    "FOCO",
    "SUCESSO",
    "FIRMEZA",
    "INSITÊNCIA",
    "COMPETIÇÃO",
  ];

  const registers: TestData[] = [
    {
      data: dadosAguia,
      sumFunc: () => {
        setAguiaCount((aguiaCount) => aguiaCount + 1);
      },
    },
    {
      data: dadosLobo,
      sumFunc: () => {
        setLoboCount((loboCount) => loboCount + 1);
      },
    },
    {
      data: dadosGolfinho,
      sumFunc: () => {
        setGolfinhoCount((golfinhoCount) => golfinhoCount + 1);
      },
    },
    {
      data: dadosTubarao,
      sumFunc: () => {
        setTubaraoCount((tubaraoCount) => tubaraoCount + 1);
      },
    },
  ];

  const questionOrder = [0, 1, 2, 3];
  const totalQuestions = dadosAguia.length;

  function shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const getQuestionShuffled = (): TestQuestion[][] => {
    var questions: TestQuestion[][] = [];
    for (let i = 0; i < totalQuestions; i++) {
      let shuffledArray = shuffle(questionOrder);
      let rowQuestion: TestQuestion[] = [];

      for (let j = 0; j < shuffledArray.length; j++) {
        rowQuestion.push({
          question: registers[shuffledArray[j]].data[i],
          sumFunc: registers[shuffledArray[j]].sumFunc,
        });
      }
      questions.push(rowQuestion);
    }
    return questions;
  };

  useEffect(() => {
    setShuffledQuestions(getQuestionShuffled());
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Typography variant="h3">Descubra seu perfil animal!</Typography>
        <Stack
          spacing={2}
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
        >
          {shuffledQuestions[currentQuestion]?.map((value, index) => {
            return (
              <Button
                key={index}
                variant="contained"
                onClick={() => {
                  value.sumFunc();
                  setCurrentQuestion(currentQuestion + 1);
                }}
              >
                {value.question}
              </Button>
            );
          })}
        </Stack>
        {currentQuestion == totalQuestions && (
          <>
            <Typography variant="h5">Resultado</Typography>
            <p>Aguia: {aguiaCount}</p>
            <p>Lobo: {loboCount}</p>
            <p>Golfinho: {golfinhoCount}</p>
            <p>Tubarão: {tubaraoCount}</p>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
