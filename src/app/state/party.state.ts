import {Action, createSelector, State, StateContext} from '@ngxs/store';
import {Party} from '../shared/models/party';
import {AddParty, ChangeParty, DeleteParty} from '../actions/party.action';
import _ from 'node_modules/lodash';
import {Category} from '../shared/models/category';

@State<Party[]>({
  name: 'party',
  defaults: []
})
export class PartyState {
  static party(id: number) {
    return createSelector([PartyState], (state: Party[]) => {
      return state.filter((party: Party) => {
        return party.id === id;
      });
    });
  }

  @Action(AddParty)
  addParty(ctx: StateContext<Party[]>, action: AddParty) {
    ctx.setState((state) => [...state, action.party]);
  }

  @Action(DeleteParty)
  deleteParty(ctx: StateContext<Party[]>, action: DeleteParty) {
    const state = [...ctx.getState()];
    _.remove(state, (party: Party) => {
      return party.id === action.partyId;
    });
    ctx.setState(state);
  }

  @Action(ChangeParty)
  changeParty(ctx: StateContext<Party[]>, action: ChangeParty) {
    const state = [...ctx.getState()];
    const index = _.findIndex(state, (party: Party) => {
      return party.id === action.party.id;
    });
    state[index] = action.party;
    ctx.setState(state);
  }
}
