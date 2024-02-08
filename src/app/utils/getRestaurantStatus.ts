import { TodayRestaurantStatus } from "../types/todayRestaurantStatus";

export function getRestaurantStatus(
  todayRestaurantStatus: TodayRestaurantStatus
) {
  const hasData = todayRestaurantStatus.length > 0;

  return hasData
    ? todayRestaurantStatus[0].attributes?.open
      ? `${todayRestaurantStatus[0].attributes.openingTime.slice(
          0,
          2
        )} - ${todayRestaurantStatus[0].attributes.closingTime.slice(0, 2)}`
      : "Restaurant closed today."
    : "Restaurant data not available";
}
