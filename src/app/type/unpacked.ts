import { GetDelicaciesQuery } from "../getDelicacies.rq.generated";

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export type DelicacyProps = Unpacked<
  NonNullable<GetDelicaciesQuery["delicacies"]>["data"]
>["attributes"];
