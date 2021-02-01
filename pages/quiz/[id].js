/* eslint-disable semi */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  // {/* <pre style={{ color: 'black' }}>
  //   {JSON.stringify(dbExterno.questions, null, 4)}
  // </pre> */}
  );
}

export async function getServerSideProps(context) {
  try {
    const [projectName, projectUser] = context.query.id.split('___')
    const dbExterno = await fetch(`https://${projectName}.${projectUser}.vercel.app/api/db`)
      .then((respostadoSevidor) => {
        if (respostadoSevidor.ok) {
          return respostadoSevidor.json();
        }
        throw new Error('Ocorreu um erro no lado do servidor');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
      // .catch((err) => {
      //   console.error(err);
      // });

    // console.log('dbExterno', dbExterno);
    // console.log('infos que o next trás par nós', context.query.id);

    return {
      props: {
        dbExterno,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}
