export type TodayRestaurantStatus = {
  __typename?: "OpeningHourEntity" | undefined;
  attributes?:
    | {
        __typename?: "OpeningHour" | undefined;
        day: string;
        open: boolean;
        openingTime: string;
        closingTime: string;
        kitchenCloses: string;
      }
    | null
    | undefined;
}[];
