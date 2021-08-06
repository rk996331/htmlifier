import { createElement as e, FormEvent } from '../lib/react.ts'
import { link, label, blockLabel } from '../utils.ts'
import { Checkbox } from './Checkbox.ts'
import { NumberField, TextField } from './Field.ts'
import { Fieldset } from './Fieldset.ts'
import { File } from './File.ts'
import { Footnote } from './Footnote.ts'
import { HtmlifyBtn } from './HtmlifyBtn.ts'
import { RadioGroups } from './RadioGroup.ts'

type Props = {
  onHtmlify: () => void
  loading: boolean
}

export const Options = ({ onHtmlify, loading }: Props) => {
  return e(
    'form',
    {
      onSubmit: (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onHtmlify()
      }
    },
    e(RadioGroups['upload-mode'], {
      title: 'Select a project by...',
      labels: {
        id: [
          [
            'a project ID on ',
            link('https://scratch.mit.edu/', 'Scratch'),
            '.'
          ],
          label(
            'Project ID: ',
            e(NumberField, { name: 'id', placeholder: 104 })
          )
        ],
        file: [
          'selecting a file on your computer:',
          [e(File, { name: 'file', accept: '.sb,.sb2,.sb3' })]
        ],
        url: [
          'a project file hosted online.',
          label(
            'URL to the file: ',
            e(TextField, {
              name: 'project-url',
              placeholder: 'https://example.com/project.sb3',
              type: 'url'
            })
          )
        ]
      }
    }),
    e(
      Fieldset,
      { title: 'Options' },
      blockLabel(
        'Text to show in the browser tab: ',
        // TODO: Set title when selecting a file if the title was unchanged
        e(TextField, { name: 'title' })
      ),
      blockLabel(
        'Value of the ',
        e('code', null, 'username'),
        ' block: ',
        e(TextField, { name: 'username' })
      ),
      blockLabel(
        e(Checkbox, { name: 'compatibility' }),
        ' Enable compatibility mode.',
        e(
          Footnote,
          { id: '2' },
          'Compatibility mode forces projects to run at 30 FPS, like in Scratch 2.0. Turning this off allows the project to run at 60 FPS.'
        )
      ),
      blockLabel(
        e(Checkbox, { name: 'turbo' }),
        ' Enable ',
        link('https://en.scratch-wiki.info/wiki/Turbo_Mode', 'turbo mode'),
        '.'
      ),
      blockLabel(
        'Tab icon (favicon): ',
        e(File, { name: 'favicon-file', accept: 'image/*' })
      ),
      blockLabel(
        'Background image: ',
        e(File, { name: 'background-file', accept: 'image/*' }),
        ' Default: a black background.'
      ),
      e(
        'p',
        null,
        label(
          e(Checkbox, { name: 'progress' }),
          ' Show a progress bar while loading.'
        ),
        ' ',
        label(
          'Colour of the progress bar: ',
          e(TextField, { name: 'progress-colour', type: 'color' })
        )
      ),
      blockLabel(
        e(Checkbox, { name: 'autostart' }),
        ' Press the green flag automatically.',
        e(
          Footnote,
          { id: '5' },
          'Browsers do not let websites automatically play audio until the user interacts with the website by clicking/tapping somewhere. If sound is important, then you should make the user click on the project before starting.'
        )
      ),
      blockLabel(
        e(Checkbox, { name: 'fullscreen' }),
        ' Show a fullscreen button.'
      ),
      blockLabel(
        e(Checkbox, { name: 'start-stop-controls' }),
        ' Show start/stop buttons, equivalent to the green flag/stop sign.'
      ),
      e(RadioGroups['loading-image'], {
        title: 'What image should show while the project loads?',
        labels: {
          file: [
            'A file on my computer.',
            [
              'Select a file: ',
              e(File, { name: 'loading-image-file', accept: 'image/*' })
            ]
          ],
          url: [
            'An image online.',
            label(
              'URL to the image: ',
              e(TextField, {
                name: 'loading-image-url',
                placeholder: 'https://example.com/image.png',
                type: 'url'
              })
            )
          ]
        }
      }),
      e(RadioGroups['stretch'], {
        title: 'What should be stretched?',
        labels: {
          stage: 'The stage and loading image.',
          'loading-image': 'Only the loading image.',
          none: "Don't stretch anything; maintain the project's aspect ratio."
        }
      }),
      e(
        Fieldset,
        { title: 'Mouse pointer (cursor)' },
        e(RadioGroups['cursor'], {
          title: 'Cursor style',
          labels: {
            default: 'Use the default cursor.',
            none: 'Hide the cursor.',
            file: [
              'Use a custom cursor.',
              label(
                'For best results, select a PNG that is up to 32 by 32 pixels: ',
                e(File, { name: 'cursor-file', accept: 'image/*' })
              )
            ]
          }
        }),
        blockLabel(
          e(Checkbox, { name: 'pointer-lock' }),
          ' Lock the pointer when the user clicks on the project.',
          e(
            Footnote,
            { id: '3' },
            'The mouse x/y blocks will report the ',
            e('em', null, 'accumulative'),
            ' mouse position, which you can use to determine the change in position between frames. If you enable this, you should also ',
            link('#no-limits', 'disable the maximum mouse x/y limit'),
            '.'
          )
        )
      ),
      e(
        Fieldset,
        { title: 'Variable/list monitor style' },
        e(
          'p',
          null,
          label(
            e(Checkbox, { name: 'use-colour' }),
            ' Use opaque monitors. (If unchecked, a translucent black will be used.)'
          ),
          ' ',
          label(
            'Colour: ',
            e(TextField, { name: 'monitor-colour', type: 'color' })
          )
        ),
        blockLabel(
          'Monitor text colour: ',
          e(TextField, { name: 'monitor-text', type: 'color' })
        ),
        blockLabel(
          e(Checkbox, { name: 'transparent-monitor' }),
          ' Hide the boxes surrounding the monitors.'
        )
      ),
      e(
        Fieldset,
        { title: 'Cloud variables' },
        e(RadioGroups['cloud-provider'], {
          title: 'Where should cloud variables be stored?',
          labels: {
            localstorage: [
              [
                'Save them in the browser. Good for saving game data.',
                e(
                  Footnote,
                  { id: '1' },
                  'Some jurisdictions have laws regarding the use of cookies, which you will have to deal if you share the converted project outside of Scratch.'
                )
              ],
              null
            ],
            ws: [
              'Use a cloud variable server. Required for multiplayer.',
              label(
                'Server URL: ',
                e(TextField, {
                  name: 'cloud-ws',
                  placeholder: 'ws://localhost:3000/',
                  type: 'url'
                }),
                e(
                  Footnote,
                  { id: 'cloud-server' },
                  " Scratch doesn't let other websites use its cloud server, but you can host your own using programs like ",
                  link(
                    'https://github.com/SheepTester/primitive-cloud-server',
                    'primitive-cloud-server'
                  ),
                  '.'
                )
              )
            ]
          }
        }),
        blockLabel(
          e(Checkbox, { name: 'special-cloud' }),
          ' Give cloud variables with certain names ',
          link(
            'https://github.com/SheepTester/htmlifier/wiki/Special-cloud-behaviours',
            'special behaviours'
          ),
          '.',
          e(
            Footnote,
            { id: '4' },
            "Special cloud variable behaviours are non-standard way for Scratch projects to do things that normally can't be done in Scratch. See a list of the special behaviours for different cloud variable names on the ",
            link(
              'https://github.com/SheepTester/htmlifier/wiki/Special-cloud-behaviours',
              'wiki'
            ),
            '. You can use ',
            link(
              'https://sheeptester.github.io/scratch-gui/?special_cloud=true',
              'E羊icques'
            ),
            ' to use the special behaviours in the editor.'
          )
        )
      ),
      e(
        Fieldset,
        {
          title: [
            link('https://sheeptester.github.io/scratch-gui/', 'E羊icques'),
            ' (modded) options'
          ]
        },
        e(
          'p',
          null,
          label(e(Checkbox, { name: 'wider' }), ' Use a custom stage size.'),
          ' ',
          label('Width: ', e(NumberField, { name: 'width', placeholder: 480 })),
          label(
            'Height: ',
            e(NumberField, { name: 'height', placeholder: 360 })
          )
        ),
        blockLabel(
          'Load ',
          link(
            'https://github.com/LLK/scratch-vm/blob/develop/docs/extensions.md#types-of-extensions',
            'unofficial extension'
          ),
          ' from URL: ',
          e(TextField, { name: 'extension-url' }),
          blockLabel(
            e(Checkbox, { name: 'no-limits' }),
            ' Remove limits such as clone and list length limits.'
          )
        )
      )
    ),
    blockLabel(
      e(Checkbox, { name: 'zip' }),
      ' Create a .zip file.',
      e(
        Footnote,
        { id: 'zip' },
        "The .zip file will contain an index.html file and separate files for the project's assets, but this means opening the HTML file directly in the browser won't work. ",
        link(
          'https://github.com/SheepTester/htmlifier/wiki/Downloading-as-a-.zip',
          'Learn more about the .zip file.'
        )
      )
    ),
    blockLabel(
      e(Checkbox, { name: 'autodownload' }),
      ' Download automatically when the conversion finishes.'
    ),
    e(HtmlifyBtn, {
      disabled: loading,
      onClick: onHtmlify
    })
  )
}
