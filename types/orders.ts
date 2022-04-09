/** @format */

export default interface order {
  id: number;
  quantity: number;
  user_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  address: string;
  prodcut_id: number;
  selected_size: string;
}
