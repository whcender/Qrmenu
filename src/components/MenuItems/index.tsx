import { categoryTypes } from '@/types';
import { fetchCategory } from '@/actions/fetchCategory';
import MenuClient from './MenuClient';

const MenuServer = async () => {
  // Kategori verilerini sunucuda alın
  const categories: categoryTypes[] = await fetchCategory();

  // Kategori verilerini istemci bileşenine aktarın
  return <MenuClient categories={categories} />;
};

export default MenuServer;
