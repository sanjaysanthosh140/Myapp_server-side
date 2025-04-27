

const cb = (err: Error, result: any) => {
    if (err) {
      return {
        result: err,
      };
    } else {
      return {
        result: result,
      };
    }
  };
  
  export = cb