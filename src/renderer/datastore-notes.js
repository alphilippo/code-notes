import Datastore from 'nedb';
import path from 'path';
import fs from 'fs';
// eslint-disable-next-line
import { remote } from 'electron';

// For migration
const dbSnippets = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/snippets.db'),
});

const dbNotes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/notes.db'),
});

// Doing the migration
if (fs.existsSync(path.join(remote.app.getPath('userData'), '/snippets.db'))) {
  dbSnippets.find({}, (err, snippets) => {
    snippets.forEach(snippet => {
      const newSnippet = {};
      newSnippet.id = snippet._id;
      newSnippet.name = snippet.name;
      newSnippet.description = snippet.description;
      newSnippet.files = {};
      newSnippet.files[`${snippet.name}`] = {
        language: snippet.language,
        content: snippet.content
      };
      dbNotes.insert(newSnippet);
    });
    fs.unlinkSync(path.join(remote.app.getPath('userData'), '/snippets.db'));
  });
}

export default dbNotes;
