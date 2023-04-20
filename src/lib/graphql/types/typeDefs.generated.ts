import type { DocumentNode } from 'graphql';
  export const typeDefs = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":6,"end":11}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"listMedia","loc":{"start":16,"end":25}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"searchString","loc":{"start":26,"end":38}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":40,"end":46}},"loc":{"start":40,"end":46}},"directives":[],"loc":{"start":26,"end":46}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"limit","loc":{"start":48,"end":53}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":55,"end":58}},"loc":{"start":55,"end":58}},"directives":[],"loc":{"start":48,"end":58}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"cursorStart","loc":{"start":60,"end":71}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":73,"end":79}},"loc":{"start":73,"end":79}},"directives":[],"loc":{"start":60,"end":79}}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Media","loc":{"start":83,"end":88}},"loc":{"start":83,"end":88}},"loc":{"start":82,"end":89}},"directives":[],"loc":{"start":16,"end":89}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"getMedia","loc":{"start":92,"end":100}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":101,"end":103}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":105,"end":107}},"loc":{"start":105,"end":107}},"loc":{"start":105,"end":108}},"directives":[],"loc":{"start":101,"end":108}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Media","loc":{"start":111,"end":116}},"loc":{"start":111,"end":116}},"directives":[],"loc":{"start":92,"end":116}}],"loc":{"start":1,"end":118}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation","loc":{"start":125,"end":133}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"uploadMedia","loc":{"start":138,"end":149}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url","loc":{"start":150,"end":153}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":155,"end":161}},"loc":{"start":155,"end":161}},"loc":{"start":155,"end":162}},"directives":[],"loc":{"start":150,"end":162}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title","loc":{"start":164,"end":169}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":171,"end":177}},"loc":{"start":171,"end":177}},"loc":{"start":171,"end":178}},"directives":[],"loc":{"start":164,"end":178}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"notes","loc":{"start":180,"end":185}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":187,"end":193}},"loc":{"start":187,"end":193}},"directives":[],"loc":{"start":180,"end":193}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Media","loc":{"start":196,"end":201}},"loc":{"start":196,"end":201}},"directives":[],"loc":{"start":138,"end":201}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteMedia","loc":{"start":204,"end":215}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":216,"end":218}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":220,"end":222}},"loc":{"start":220,"end":222}},"loc":{"start":220,"end":223}},"directives":[],"loc":{"start":216,"end":223}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Media","loc":{"start":226,"end":231}},"loc":{"start":226,"end":231}},"directives":[],"loc":{"start":204,"end":231}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updateMedia","loc":{"start":234,"end":245}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":246,"end":248}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":250,"end":252}},"loc":{"start":250,"end":252}},"loc":{"start":250,"end":253}},"directives":[],"loc":{"start":246,"end":253}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title","loc":{"start":255,"end":260}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":262,"end":268}},"loc":{"start":262,"end":268}},"directives":[],"loc":{"start":255,"end":268}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"notes","loc":{"start":270,"end":275}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":277,"end":283}},"loc":{"start":277,"end":283}},"directives":[],"loc":{"start":270,"end":283}}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":286,"end":288}},"loc":{"start":286,"end":288}},"loc":{"start":286,"end":289}},"directives":[],"loc":{"start":234,"end":289}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"clipVideo","loc":{"start":292,"end":301}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":302,"end":304}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":306,"end":308}},"loc":{"start":306,"end":308}},"loc":{"start":306,"end":309}},"directives":[],"loc":{"start":302,"end":309}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"startTime","loc":{"start":311,"end":320}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":322,"end":327}},"loc":{"start":322,"end":327}},"loc":{"start":322,"end":328}},"directives":[],"loc":{"start":311,"end":328}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"endTime","loc":{"start":330,"end":337}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":339,"end":344}},"loc":{"start":339,"end":344}},"loc":{"start":339,"end":345}},"directives":[],"loc":{"start":330,"end":345}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url","loc":{"start":347,"end":350}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":352,"end":358}},"loc":{"start":352,"end":358}},"loc":{"start":352,"end":359}},"directives":[],"loc":{"start":347,"end":359}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title","loc":{"start":361,"end":366}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":368,"end":374}},"loc":{"start":368,"end":374}},"loc":{"start":368,"end":375}},"directives":[],"loc":{"start":361,"end":375}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ClipResult","loc":{"start":378,"end":388}},"loc":{"start":378,"end":388}},"directives":[],"loc":{"start":292,"end":388}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"extractVideo","loc":{"start":391,"end":403}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url","loc":{"start":404,"end":407}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":409,"end":415}},"loc":{"start":409,"end":415}},"loc":{"start":409,"end":416}},"directives":[],"loc":{"start":404,"end":416}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"type","loc":{"start":418,"end":422}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoType","loc":{"start":424,"end":433}},"loc":{"start":424,"end":433}},"loc":{"start":424,"end":434}},"directives":[],"loc":{"start":418,"end":434}}],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":438,"end":444}},"loc":{"start":438,"end":444}},"loc":{"start":438,"end":445}},"loc":{"start":437,"end":446}},"directives":[],"loc":{"start":391,"end":446}}],"loc":{"start":120,"end":448}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Media","loc":{"start":455,"end":460}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":465,"end":467}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":469,"end":471}},"loc":{"start":469,"end":471}},"loc":{"start":469,"end":472}},"directives":[],"loc":{"start":465,"end":472}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title","loc":{"start":475,"end":480}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":482,"end":488}},"loc":{"start":482,"end":488}},"loc":{"start":482,"end":489}},"directives":[],"loc":{"start":475,"end":489}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"notes","loc":{"start":492,"end":497}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":499,"end":505}},"loc":{"start":499,"end":505}},"directives":[],"loc":{"start":492,"end":505}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"thumbnail","loc":{"start":508,"end":517}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":519,"end":525}},"loc":{"start":519,"end":525}},"loc":{"start":519,"end":526}},"directives":[],"loc":{"start":508,"end":526}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"status","loc":{"start":529,"end":535}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaStatus","loc":{"start":537,"end":548}},"loc":{"start":537,"end":548}},"loc":{"start":537,"end":549}},"directives":[],"loc":{"start":529,"end":549}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"assetType","loc":{"start":552,"end":561}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetType","loc":{"start":563,"end":572}},"loc":{"start":563,"end":572}},"loc":{"start":563,"end":573}},"directives":[],"loc":{"start":552,"end":573}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url","loc":{"start":576,"end":579}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":581,"end":587}},"loc":{"start":581,"end":587}},"loc":{"start":581,"end":588}},"directives":[],"loc":{"start":576,"end":588}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"metadata","loc":{"start":591,"end":599}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaMetadata","loc":{"start":601,"end":614}},"loc":{"start":601,"end":614}},"directives":[],"loc":{"start":591,"end":614}}],"loc":{"start":450,"end":616}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"VideoMetadata","loc":{"start":623,"end":636}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"width","loc":{"start":641,"end":646}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":648,"end":651}},"loc":{"start":648,"end":651}},"directives":[],"loc":{"start":641,"end":651}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"height","loc":{"start":654,"end":660}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":662,"end":665}},"loc":{"start":662,"end":665}},"directives":[],"loc":{"start":654,"end":665}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"duration","loc":{"start":668,"end":676}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":678,"end":683}},"loc":{"start":678,"end":683}},"directives":[],"loc":{"start":668,"end":683}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"aspectRatio","loc":{"start":686,"end":697}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":699,"end":705}},"loc":{"start":699,"end":705}},"directives":[],"loc":{"start":686,"end":705}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"frameRate","loc":{"start":708,"end":717}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":719,"end":722}},"loc":{"start":719,"end":722}},"directives":[],"loc":{"start":708,"end":722}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"videoCodec","loc":{"start":725,"end":735}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":737,"end":743}},"loc":{"start":737,"end":743}},"directives":[],"loc":{"start":725,"end":743}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"audioCodec","loc":{"start":746,"end":756}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":758,"end":764}},"loc":{"start":758,"end":764}},"directives":[],"loc":{"start":746,"end":764}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"originalSource","loc":{"start":767,"end":781}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":783,"end":789}},"loc":{"start":783,"end":789}},"directives":[],"loc":{"start":767,"end":789}}],"loc":{"start":618,"end":791}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"AudioMetadata","loc":{"start":798,"end":811}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"duration","loc":{"start":816,"end":824}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":826,"end":831}},"loc":{"start":826,"end":831}},"directives":[],"loc":{"start":816,"end":831}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"audioCodec","loc":{"start":834,"end":844}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":846,"end":852}},"loc":{"start":846,"end":852}},"directives":[],"loc":{"start":834,"end":852}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"originalSource","loc":{"start":855,"end":869}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":871,"end":877}},"loc":{"start":871,"end":877}},"directives":[],"loc":{"start":855,"end":877}}],"loc":{"start":793,"end":879}},{"kind":"UnionTypeDefinition","name":{"kind":"Name","value":"MediaMetadata","loc":{"start":887,"end":900}},"directives":[],"types":[{"kind":"NamedType","name":{"kind":"Name","value":"VideoMetadata","loc":{"start":903,"end":916}},"loc":{"start":903,"end":916}},{"kind":"NamedType","name":{"kind":"Name","value":"AudioMetadata","loc":{"start":919,"end":932}},"loc":{"start":919,"end":932}}],"loc":{"start":881,"end":932}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ClipResult","loc":{"start":939,"end":949}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":954,"end":956}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":958,"end":960}},"loc":{"start":958,"end":960}},"loc":{"start":958,"end":961}},"directives":[],"loc":{"start":954,"end":961}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url","loc":{"start":964,"end":967}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":969,"end":975}},"loc":{"start":969,"end":975}},"loc":{"start":969,"end":976}},"directives":[],"loc":{"start":964,"end":976}}],"loc":{"start":934,"end":978}},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"MediaStatus","loc":{"start":985,"end":996}},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"PENDING","loc":{"start":1001,"end":1008}},"directives":[],"loc":{"start":1001,"end":1008}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"READY","loc":{"start":1011,"end":1016}},"directives":[],"loc":{"start":1011,"end":1016}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"FAILED","loc":{"start":1019,"end":1025}},"directives":[],"loc":{"start":1019,"end":1025}}],"loc":{"start":980,"end":1027}},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"VideoType","loc":{"start":1034,"end":1043}},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"YOUTUBE","loc":{"start":1048,"end":1055}},"directives":[],"loc":{"start":1048,"end":1055}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"TIKTOK","loc":{"start":1058,"end":1064}},"directives":[],"loc":{"start":1058,"end":1064}}],"loc":{"start":1029,"end":1066}},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"AssetType","loc":{"start":1073,"end":1082}},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"IMAGE","loc":{"start":1087,"end":1092}},"directives":[],"loc":{"start":1087,"end":1092}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"VIDEO","loc":{"start":1095,"end":1100}},"directives":[],"loc":{"start":1095,"end":1100}},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"AUDIO","loc":{"start":1103,"end":1108}},"directives":[],"loc":{"start":1103,"end":1108}}],"loc":{"start":1068,"end":1110}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"DemoItem","loc":{"start":1116,"end":1124}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"message","loc":{"start":1129,"end":1136}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1138,"end":1144}},"loc":{"start":1138,"end":1144}},"loc":{"start":1138,"end":1145}},"directives":[],"loc":{"start":1129,"end":1145}}],"loc":{"start":1111,"end":1147}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mascot","loc":{"start":1154,"end":1160}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":1165,"end":1167}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1169,"end":1175}},"loc":{"start":1169,"end":1175}},"loc":{"start":1169,"end":1176}},"directives":[],"loc":{"start":1165,"end":1176}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name","loc":{"start":1179,"end":1183}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1185,"end":1191}},"loc":{"start":1185,"end":1191}},"loc":{"start":1185,"end":1192}},"directives":[],"loc":{"start":1179,"end":1192}}],"loc":{"start":1149,"end":1194}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":1201,"end":1206}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"greetings","loc":{"start":1211,"end":1220}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input","loc":{"start":1221,"end":1226}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1228,"end":1234}},"loc":{"start":1228,"end":1234}},"loc":{"start":1228,"end":1235}},"directives":[],"loc":{"start":1221,"end":1235}}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1238,"end":1244}},"loc":{"start":1238,"end":1244}},"loc":{"start":1238,"end":1245}},"directives":[],"loc":{"start":1211,"end":1245}}],"loc":{"start":1196,"end":1247}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation","loc":{"start":1254,"end":1262}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createMascot","loc":{"start":1267,"end":1279}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name","loc":{"start":1280,"end":1284}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1286,"end":1292}},"loc":{"start":1286,"end":1292}},"loc":{"start":1286,"end":1293}},"directives":[],"loc":{"start":1280,"end":1293}}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mascot","loc":{"start":1296,"end":1302}},"loc":{"start":1296,"end":1302}},"loc":{"start":1296,"end":1303}},"directives":[],"loc":{"start":1267,"end":1303}}],"loc":{"start":1249,"end":1305}}],"loc":{"start":0,"end":1305}} as unknown as DocumentNode