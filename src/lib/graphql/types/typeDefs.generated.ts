import type { DocumentNode } from 'graphql';
  export const typeDefs = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"DemoItem","loc":{"start":6,"end":14}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"message","loc":{"start":19,"end":26}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":28,"end":34}},"loc":{"start":28,"end":34}},"loc":{"start":28,"end":35}},"directives":[],"loc":{"start":19,"end":35}}],"loc":{"start":1,"end":37}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":44,"end":49}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"greetings","loc":{"start":54,"end":63}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input","loc":{"start":64,"end":69}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":71,"end":77}},"loc":{"start":71,"end":77}},"loc":{"start":71,"end":78}},"directives":[],"loc":{"start":64,"end":78}}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":81,"end":87}},"loc":{"start":81,"end":87}},"loc":{"start":81,"end":88}},"directives":[],"loc":{"start":54,"end":88}}],"loc":{"start":39,"end":90}}],"loc":{"start":0,"end":90}} as unknown as DocumentNode