import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDirection } from 'graphql/generated.graphql';

type direction = OrderDirection;
interface attribute {
  slug: string;
  values: string[];
}

interface FilterState {
  price: {
    lte: number;
    gte: number;
  };
  sort?: {
    direction: direction;
  };
  attributes?: attribute[];
}

const initialState: FilterState = {
  price: {
    lte: 100,
    gte: 10,
  },
  attributes: []
};

export const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changePrice: (
      state,
      action: PayloadAction<{ type: 'lte' | 'gte'; value: number }>
    ) => {
      return {
        ...state,
        price: { ...state.price, [action.payload.type]: action.payload.value },
      };
    },
    sort: (state, action: PayloadAction<{direction: direction}>) => {
      return {
        ...state,
        sort: {
          direction: action.payload.direction,
        },
      };
    },
    filterAttributes: (state, action: PayloadAction<attribute>) => {
      const isExists = state.attributes?.find(
        (attr) => attr.slug === action.payload.slug
      )?.slug;
      console.log(isExists)
      if (!isExists && state.attributes?.length !== undefined) {
        return {
          ...state,
          attributes: [...state.attributes, action.payload],
        };
      }
      return {
        ...state,
        attributes: state.attributes?.map((attr) => {
          if (attr.slug === isExists) {
            const valueOrder = attr.values.indexOf(action.payload.values[0]);
            if(valueOrder > -1) {
              return {...attr}
            }
            return { ...attr, values: [...attr.values, action.payload.values[0]]  };
          }
          return attr;
        }),
      };
    },
  },
});

export const { changePrice, sort, filterAttributes } = filter.actions;
export default filter.reducer;