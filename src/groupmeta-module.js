class GroupMetaModule {
  constructor(key, ...subkeys) {
    if (!key) {
      throw new Error('GroupMetaModule needs a key to group existing keys under');
    }
    this.key = key;
    this.subkeys = subkeys || [];
  }

  execute(docs, ctx) {
    for (let doc of docs) {
      if (this.subkeys.length === 0) {
        let existing = doc.meta;
        doc.meta = {
          [this.key]: existing
        };
      } else {
        let existing = {};
        for (let old of this.subkeys) {
          if (old in doc.meta) {
            existing[old] = doc.meta[old];
            delete doc.meta[old];
          }
        }
        doc.meta[this.key] = existing;
      }
    }
    return docs;
  }
}

export default function groupMeta(key, ...subkeys) {
  return new GroupMetaModule(key, ...subkeys);
}