import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RestauranteResumo {
  id: number;
  nome: string;
  imagemUrl?: string; 
}

interface RecentesState {
  items: RestauranteResumo[];
}

const initialState: RecentesState = {
  items: [],
};

const recentesSlice = createSlice({
  name: 'recentes',
  initialState,
  reducers: {
    adicionarVistoRecentemente: (state, action: PayloadAction<RestauranteResumo>) => {
      const restaurante = action.payload;
     
      state.items = state.items.filter(item => item.id !== restaurante.id);
      state.items.unshift(restaurante);

      if (state.items.length > 5) {
        state.items.pop();
      }
    }
  },
});

export const { adicionarVistoRecentemente } = recentesSlice.actions;
export default recentesSlice.reducer;