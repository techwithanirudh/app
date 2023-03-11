import { test, given } from '@acrd/ion';
import { generateSnowflake } from '../../../src/data/snowflake-entity';
import { longString, mongooseError } from '../../test-utils';
import { Theme } from '../../../src/data/models/theme';
import generateInvite from '../../../src/data/utils/generate-invite';

test(createTheme, () => {
  given().expect(true);
  given({ creatorId: '' }).expect('Creator ID is required');
  given({ creatorId: 'test' }).expect('Invalid Snowflake ID');
  given({ creatorId: generateSnowflake() }).expect(true);
  given({ name: '' }).expect('Name is required');
  given({ name: longString(33) }).expect('Name is too long');
  given({ name: 'Cool Theme' }).expect(true);
  given({ code: 'anichat' }).expect('This code is reserved');
  given({ code: 'default' }).expect('This code is reserved');
  given({ code: 'discord' }).expect('This code is reserved');
  given({ code: generateInvite() }).expect(true);
  given({ styles: longString(10001) })
    .message('Max length styles reached, rejected')
    .expect('Max supported style length reached: 10k characters');
});

function createTheme(theme: any) {
  const error = new Theme({
    name: 'Cool Theme',
    creatorId: generateSnowflake(),
    styles: 'body { font-family: Impact; }',
    ...theme,
  }).validateSync();

  return mongooseError(error);
}
