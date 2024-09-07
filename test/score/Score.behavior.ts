import { expect } from "chai";

function calculateExpectedScore(
  K: number,
  KI: number,
  KC: number,
  KL: number,
  KD: number,
  income: number,
  DTI: number,
  CHL: number,
  KIS: boolean,
  KCS: boolean,
  KLS: boolean,
  KDS: boolean,
): number {
  let score = K;
  if (KIS) score += KI * income;
  else score -= KI * income;
  if (KCS) score += KC * DTI;
  else score -= KC * DTI;
  if (KLS) score += KL * CHL;
  else score -= KL * CHL;
  if (KDS) score += KD;
  else score -= KD;
  return score;
}

export function shouldBehaveLikeScore(): void {
  const K = 600;
  const KI = 1;
  const KC = 1;
  const KL = 1;
  const KD = 10;
  const KIS = true;
  const KCS = true;
  const KLS = true;
  const KDS = false;

  it("should check if a user has a model", async function () {
    const hasModel = await this.score
      .connect(this.signers.admin)
      .hasModel(this.instance.permission);
    console.log("🚀 ~ hasModel:", hasModel);
    expect(
      await this.score
        .connect(this.signers.admin)
        .hasModel(this.instance.permission),
    ).to.be.reverted;
  });

  it("should create a new record", async function () {

    const encriptedK = await this.instance.instance.encrypt_uint16(K);
    const encriptedKI = await this.instance.instance.encrypt_uint16(KI);
    
    const encriptedKC = await this.instance.instance.encrypt_uint16(KC);
    const encriptedKL = await this.instance.instance.encrypt_uint16(KL);
    const encriptedKD = await this.instance.instance.encrypt_uint16(KD);

    await this.score
      .connect(this.signers.admin)
      .addModel(
        encriptedK,
        encriptedKI,
        KIS,
        encriptedKC,
        KCS,
        encriptedKL,
        KLS,
        encriptedKD,
        KDS,
      );

    const hasModel = await this.score
      .connect(this.signers.admin)
      .hasModel(this.instance.permission);
    console.log("🚀 ~ hasModel:", hasModel);
    expect(hasModel).to.be.true;
  });

  it("Should predict a record", async function () {
    const Income = 2;
    const DTI = 1;
    const CHL = 3;

    const encriptedIncome = await this.instance.instance.encrypt_uint16(2);
    const encriptedDTI = await this.instance.instance.encrypt_uint16(1);
    const encriptedCHL = await this.instance.instance.encrypt_uint16(3);

    const predictedScore = await this.score
      .connect(this.signers.admin)
      .predictScore(
        this.instance.permission,
        encriptedIncome,
        encriptedDTI,
        encriptedCHL,
      );
    console.log("🚀 ~ predictedScore:", predictedScore);

    const expectedScore = calculateExpectedScore(
      K,
      KI,
      KC,
      KL,
      KD,
      Income,
      DTI,
      CHL,
      KIS,
      KCS,
      KLS,
      KDS,
    );
    expect(predictedScore).to.be.equal(expectedScore);
  });
}
