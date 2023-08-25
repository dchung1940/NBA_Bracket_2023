function addFirstRound(setPlayoff,round, conf, team) {
    setPlayoff((prevState) => {
      const found = prevState[round].indexOf("");
      if (found != -1) {
        prevState[round][found] = team;
        prevState[conf] += 1;
      }
      return { ...prevState };
    });
  }

  function removeFirstRound(setPlayoff,array, team, conf) {
    setPlayoff((prevState) => {
      for (let i = 0; i < array.length; ++i) {
        let temp = array[i];
        const found = prevState[temp].indexOf(team);

        if (found != -1) {
          prevState[temp][found] = "";
        } else {
          break;
        }
      }
      prevState[conf] -= 1;
      return { ...prevState };
    });
  }

  function addRound(setPlayoff,round, index_, team, array) {
    setPlayoff((prevState) => {
      // Update the Team
      let old_team = prevState[round][index_];
      prevState[round][index_] = team;
      // Delete old teams that were further into the rounds
      let curr_index = Math.floor(index_ / 2);
      for (let i = 1; i < array.length; ++i) {
        let temp = array[i];
        let value = prevState[temp][curr_index];
        if (value == old_team) {
          prevState[temp][curr_index] = "";
          curr_index = Math.floor(curr_index / 2);
        } else {
          break;
        }
      }
      return { ...prevState };
    });
  }

  function removeRound(setPlayoff,index_, array, team) {
    // Delete old team in the current round and further rounds
    setPlayoff((prevState) => {
      let curr_index = index_;
      for (let i = 0; i < array.length; ++i) {
        let temp = array[i];
        let value = prevState[temp][curr_index];
        if (value == team) {
          prevState[temp][curr_index] = "";
          curr_index = Math.floor(curr_index / 2);
        } else {
          break;
        }
      }
      return { ...prevState };
    });
  }

  export {addFirstRound,removeFirstRound,addRound,removeRound}