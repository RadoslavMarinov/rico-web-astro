import { Beneficiary } from "./Beneficiary";
import { beneficiaries } from "./beneficiaryPool";

type Options = {
  latencyMS?: number;
};

export async function getAllBeneficiaries(
  options?: Options
): Promise<Beneficiary[]> {
  return promisifyWithDelay(beneficiaries, options?.latencyMS);
}

export const getAllByCurrency = (currency: string, options: Options = {}) =>
  promisifyWithDelay(
    beneficiaries.filter((t) => t.currency === currency),
    options?.latencyMS
  );

export function promisifyWithDelay<T>(data: T, delayMs = 1000): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
}
