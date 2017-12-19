const mongoose = require('mongoose');
const bijection = require('../bijection');
const Schema = mongoose.Schema;

// counter for autoincrement id used in URL schema
const CounterSchema = Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', CounterSchema);

const urlSchema = new Schema({
  _id: {type: Number, index: true},
  original_url: { type: String, required: true },
  alias: String,
  custom_alias: String,
  access_count: { type: Number, default: 0 },
  created_at: Date
});

urlSchema.pre('save', async function(next) {
  let doc = this;

  let c = null;
  
  c = await Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} });

  if (c == null) {
    c = new Counter({_id: 'url_count', seq: 1});
    await c.save()
  }

  doc._id = c.seq;
  doc.created_at = new Date();
    
  if (!doc.custom_alias)
    doc.alias = bijection.encode(doc._id);
  else
    doc.alias = doc.custom_alias;

  next();
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;