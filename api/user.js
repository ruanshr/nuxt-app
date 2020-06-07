import axios from '@/plugins/axios'
export async function getCustomerList() {
  const list = await axios.get('/user/list')
  console.log(list)
}
