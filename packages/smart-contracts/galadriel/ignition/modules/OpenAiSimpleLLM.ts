import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ORACLE_ADDRESS = process.env.ORACLE_ADDRESS;

const OpenAiSimpleLLMModule = buildModule("OpenAiSimpleLLMModule", (m) => {
  const oracle = m.getParameter("oracle", ORACLE_ADDRESS);

  const openAiSimpleLLM = m.contract("OpenAiSimpleLLM", [oracle]);
  return { openAiSimpleLLM };
});

export default OpenAiSimpleLLMModule;
