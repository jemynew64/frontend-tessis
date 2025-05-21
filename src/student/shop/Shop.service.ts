import axiosAuth from '../../shared/utils/AxiosHeader';

export const buy_life_service = async () => {
  return await axiosAuth.post("shop");
};

