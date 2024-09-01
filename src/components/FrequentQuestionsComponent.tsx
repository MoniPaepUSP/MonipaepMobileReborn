import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Accordion } from "./Accordion";
import colors from "../styles/colors";
import { List } from "react-native-paper";

type FAQTopicQuestion = {
  question: string;
  answer: string;
};

type FAQQuestion = {
  topic: string;
  questions: FAQTopicQuestion[];
};

const atendimentoQuestions: FAQTopicQuestion[] = [
  {
    question: "Qual o nome da UPA que fui atendido?",
    answer: "Você foi atendido na UPA Central da cidade.",
  },
  {
    question: "Quais documentos são necessários para o atendimento?",
    answer:
      "Você precisará de um documento de identificação com foto e seu cartão do SUS.",
  },
  {
    question: "Como posso agendar uma consulta?",
    answer:
      "Você pode agendar uma consulta pelo telefone ou diretamente no site da UPA.",
  },
];

const principaisSintomasQuestions: FAQTopicQuestion[] = [
  {
    question: "Quais são os principais sintomas da dengue?",
    answer:
      "Os principais sintomas incluem febre alta, dor de cabeça intensa, dor atrás dos olhos, dores musculares e nas articulações, náuseas, vômitos e erupções cutâneas.",
  },
  {
    question: "Como diferenciar dengue de uma gripe comum?",
    answer:
      "A dengue geralmente causa dores mais intensas e persistentes nas articulações e músculos, além de erupções cutâneas e febre alta que pode durar de 2 a 7 dias.",
  },
  {
    question: "O que devo fazer se suspeitar que estou com dengue?",
    answer:
      "Procure um serviço de saúde imediatamente para avaliação e tratamento adequado.",
  },
];

const cuidadosIniciaisQuestions: FAQTopicQuestion[] = [
  {
    question: "Quais são os cuidados iniciais em caso de suspeita de dengue?",
    answer:
      "Mantenha-se hidratado bebendo bastante líquido, evite medicamentos que contenham ácido acetilsalicílico e procure atendimento médico.",
  },
  {
    question: "Posso tomar medicamentos para aliviar os sintomas?",
    answer:
      "Evite medicamentos como aspirina e ibuprofeno, que podem agravar a condição. Paracetamol pode ser utilizado para aliviar dores e febre, mas sempre sob orientação médica.",
  },
  {
    question: "Como prevenir a disseminação da dengue em casa?",
    answer:
      "Elimine locais de água parada, use repelentes e mantenha portas e janelas fechadas ou com telas de proteção.",
  },
];

const informacoesDengueQuestions: FAQTopicQuestion[] = [
  {
    question: "Como a dengue é transmitida?",
    answer:
      "A dengue é transmitida pela picada do mosquito Aedes aegypti infectado com o vírus da dengue.",
  },
  {
    question: "Quais são os tipos de dengue?",
    answer:
      "Existem quatro sorotipos diferentes do vírus da dengue: DENV-1, DENV-2, DENV-3 e DENV-4.",
  },
  {
    question: "Qual é o período de incubação do vírus da dengue?",
    answer:
      "O período de incubação varia de 4 a 10 dias após a picada do mosquito infectado.",
  },
];

const suporteTecnicoQuestions: FAQTopicQuestion[] = [
  {
    question: "Qual é o horário de atendimento do suporte técnico?",
    answer:
      "O suporte técnico está disponível de segunda a sexta-feira, das 8h às 18h.",
  },
  {
    question: "Como entrar em contato com o suporte técnico?",
    answer:
      "Você pode entrar em contato pelo telefone 0800-123-456 ou pelo e-mail suporte@exemplo.com.",
  },
  {
    question: "Existe suporte técnico disponível nos finais de semana?",
    answer: "Não, o suporte técnico não está disponível nos finais de semana.",
  },
];

const FAQ_QUESTIONS: FAQQuestion[] = [
  {
    topic: "Atendimento",
    questions: atendimentoQuestions,
  },
  {
    topic: "Principais Sintomas",
    questions: principaisSintomasQuestions,
  },
  {
    topic: "Cuidados Iniciais",
    questions: cuidadosIniciaisQuestions,
  },
  {
    topic: "Informações sobre a Dengue",
    questions: informacoesDengueQuestions,
  },
  {
    topic: "Suporte Técnico",
    questions: suporteTecnicoQuestions,
  },
];

export default function FrequentQuestionsComponent(): JSX.Element {
  const [questionFilter, setQuestionFilter] = useState("");
  const shouldFilter = questionFilter.length > 2;
  const filteredFAQ = shouldFilter
    ? FAQ_QUESTIONS.filter((faq): boolean => {
        const { topic } = faq;
        const cleanQuestionFilter = questionFilter.toLowerCase().trim();
        const cleanTopic = topic.toLowerCase().trim();

        return cleanTopic.includes(cleanQuestionFilter);
      })
    : FAQ_QUESTIONS;

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Procure por uma pergunta específica"
          value={questionFilter}
          onChangeText={setQuestionFilter}
        />
      </View>

      {filteredFAQ.map((faq, index): JSX.Element => {
        const { topic } = faq;

        return (
          <List.Accordion title={topic} titleStyle={styles.topicTitle} style={styles.topicContainer}>
            {faq.questions.map((q, i) => {
              const { answer, question } = q;
              return (
                <List.Accordion
                  title={question}
                  titleStyle={styles.questionTitle}
                  style={styles.questionContainer}
                >
                  <List.Item
                    title={answer}
                    titleStyle={styles.answerText}
                    titleNumberOfLines={1000}
                  />
                </List.Accordion>
              );
            })}
          </List.Accordion>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  topicTitle: { fontSize: 18, fontWeight: "bold", color: colors.white },
  questionTitle: { fontSize: 16, fontWeight: "bold", paddingLeft: 20 },
  answerText: {
    fontSize: 14,
    paddingLeft: 35,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
  topicContainer: {
    backgroundColor: colors.blue,
    color: colors.white
  },
  questionContainer: {
    backgroundColor: colors.gray_light1,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    textAlignVertical: "top",
  },
});
