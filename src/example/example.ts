import {
  CheckboxField,
  CheckboxMultiField,
  ColorField,
  DateField,
  DatetimeField,
  FieldConstructor,
  GroupField,
  LengthRule,
  ListField,
  MatchRule,
  NumberField,
  PatternRule,
  RadioField,
  RangeRule,
  RequireRule,
  TextField,
  TextareaField,
  TimeField,
  VariantField,
} from '@blinkk/selective-edit';
import {AmagakiDocumentField} from '../projectType/amagaki/field/document';
import {AmagakiStaticField} from '../projectType/amagaki/field/static';
import {AmagakiStringField} from '../projectType/amagaki/field/string';
import {AsideField} from '../editor/field/aside';
import {EditorState} from '../editor/state';
import {ExampleApi} from './exampleApi';
import {ExampleFieldField} from './field/exampleField';
import {ExampleTool} from './exampleTool';
import {GrowDocumentField} from '../projectType/grow/field/document';
import {GrowStaticField} from '../projectType/grow/field/static';
import {GrowStringField} from '../projectType/grow/field/string';
import {LiveEditor} from '../editor/editor';
import {MediaField} from '../editor/field/media';
import {MediaListField} from '../editor/field/mediaList';
import {RuleConstructor} from '@blinkk/selective-edit';

const container = document.querySelector('.container');
const exampleApi = new ExampleApi();
const exampleState = new EditorState(exampleApi);
const exampleEditor = new LiveEditor(
  {
    api: exampleApi,
    selectiveConfig: {
      fieldTypes: {
        amagakiDocument: (AmagakiDocumentField as unknown) as FieldConstructor,
        amagakiStatic: (AmagakiStaticField as unknown) as FieldConstructor,
        amagakiString: (AmagakiStringField as unknown) as FieldConstructor,
        aside: (AsideField as unknown) as FieldConstructor,
        checkbox: (CheckboxField as unknown) as FieldConstructor,
        checkboxMulti: (CheckboxMultiField as unknown) as FieldConstructor,
        color: (ColorField as unknown) as FieldConstructor,
        date: (DateField as unknown) as FieldConstructor,
        datetime: (DatetimeField as unknown) as FieldConstructor,
        exampleField: (ExampleFieldField as unknown) as FieldConstructor,
        group: (GroupField as unknown) as FieldConstructor,
        growDocument: (GrowDocumentField as unknown) as FieldConstructor,
        growStatic: (GrowStaticField as unknown) as FieldConstructor,
        growString: (GrowStringField as unknown) as FieldConstructor,
        list: (ListField as unknown) as FieldConstructor,
        media: (MediaField as unknown) as FieldConstructor,
        mediaList: (MediaListField as unknown) as FieldConstructor,
        number: (NumberField as unknown) as FieldConstructor,
        radio: (RadioField as unknown) as FieldConstructor,
        text: (TextField as unknown) as FieldConstructor,
        textarea: (TextareaField as unknown) as FieldConstructor,
        time: (TimeField as unknown) as FieldConstructor,
        variant: (VariantField as unknown) as FieldConstructor,
      },
      ruleTypes: {
        length: (LengthRule as unknown) as RuleConstructor,
        match: (MatchRule as unknown) as RuleConstructor,
        pattern: (PatternRule as unknown) as RuleConstructor,
        range: (RangeRule as unknown) as RuleConstructor,
        require: (RequireRule as unknown) as RuleConstructor,
      },
      global: {
        api: exampleApi,
        labels: {},
        state: exampleState,
      },
    },
    state: exampleState,
  },
  container as HTMLElement
);

const url = new URL(window.location.toString());
if (url.searchParams.get('path')) {
  exampleEditor.state.getFile({
    path: url.searchParams.get('path') || '',
  });
}

/**
 * Tool for working with the api through the UI.
 */
const toolContainer = document.querySelector('.example_tool');
const tool = new ExampleTool(
  exampleEditor.config.api as ExampleApi,
  exampleEditor.storage,
  toolContainer as HTMLElement
);
tool.render();

// Render the editor after the tool is created so that stored
// error states can be loaded before the editor calls them.
exampleEditor.render();
