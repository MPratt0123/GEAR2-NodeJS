// Global middleware for auto-generated controllers: create,list,read,update,delete

// called from "Default Milestones for actions" (see the docs for more)
const addContentRange = function (req, res) {
  console.log(`\n\n\nHEY!\n\n\n`);
};

module.exports = {
  create: {
    write: (req, res, context) => {
      addContentRange.call(this, req, res);
      return context.continue;
    }
  },
  list: {
    fetch: (req, res, context) => {
      res.set('X-Total-Count', context.instance.length);
      res.set('Access-Control-Expose-Headers', 'Content-Range, X-Total-Count');
      addContentRange.call(this, req, res);
      return context.continue;
    }
  },
  read: {
    fetch: (req, res, context) => {
      addContentRange.call(this, req, res);
      return context.continue;
    }
  },
  update: {
    fetch: (req, res, context) => {
      addContentRange.call(this, req, res);
      return context.continue;
    }
    // NOTE: 'write' fires immediately following the SQL UPDATE call for parent record
    // write: (req, res, context) => {
    //   console.log(`\n\nMIDDLEWARE IN EFFECT\n`);
    //   // console.log(context.instance.dataValues);
    //   // console.log('Iterate over "include" objects);
    //
    //   context.instance.dataValues['fismaArtifact'].forEach((instance) => {
    //     console.log(instance);
    //     console.log('--------------');
    //   });
    //
    //   console.log(`\nMIDDLEWARE EFFECT OVER\n\n`);
    //   return context.continue;
    // },
  },
  delete: {
    fetch: (req, res, context) => {
      addContentRange.call(this, req, res);
      return context.continue;
    }
  }
};