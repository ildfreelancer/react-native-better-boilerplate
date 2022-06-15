import dayjs, { Dayjs } from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(LocalizedFormat)

export const formatTime = (
  time: Date | Dayjs | string | number,
  format: string,
) => dayjs(time).format(format)
