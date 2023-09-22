import React from 'react'

import classes from './index.module.scss'

export type LogLine = {
  service: string
  timestamp: string
  message: string
}

const LogLine = ({ logLine }: { logLine: LogLine }) => {
  const { service, timestamp, message } = logLine || {}
  let lineType = 'default'
  let messageChunks = [
    {
      appearance: 'text',
      text: message,
    },
  ]

  if (message.startsWith('╰') || message.startsWith('╭')) {
    messageChunks[0].appearance = 'style'
  }

  if (message.startsWith('│')) {
    const text = message.substring(1)
    messageChunks = [
      {
        appearance: 'style',
        text: '│',
      },
      {
        appearance: 'text',
        text,
      },
    ]
  }

  if (message.startsWith('│  ✔') || message.trim().startsWith('✔')) {
    lineType = 'success'
  } else if (
    message.startsWith('│  ✘') ||
    message.trim().startsWith('✘') ||
    message.startsWith('error') ||
    message.startsWith('│ error')
  ) {
    lineType = 'error'
  } else if (
    message.startsWith('│ Done') ||
    message.trim().startsWith('›') ||
    message.trim().startsWith('$') ||
    message.startsWith('│ $')
  ) {
    lineType = 'info'
  } else if (message.startsWith('│ warning') || message.startsWith('warning')) {
    lineType = 'warning'
  }

  return (
    <tr className={[classes.logLine, classes[`lineType--${lineType}`]].join(' ')}>
      {timestamp && <td className={classes.logTimestamp}>{`[${timestamp.split('.')[0]}]`}</td>}
      {messageChunks.length > 0 && (
        <td>
          {messageChunks.map((chunk, i) => (
            <span
              key={i}
              className={[classes.logText, classes[`logTextAppearance--${chunk.appearance}`]].join(
                ' ',
              )}
            >
              {chunk.text}
            </span>
          ))}
        </td>
      )}
    </tr>
  )
}

type Props = {
  logs: LogLine[]
}
export const SimpleLogs: React.FC<Props> = ({ logs }) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null)
  const scrollContent = React.useRef<HTMLTableSectionElement>(null)
  const pinnedScroll = React.useRef(true)

  const scrollToBottom = React.useCallback(() => {
    if (!scrollContainer.current || !pinnedScroll.current) return
    scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight
  }, [])

  React.useEffect(() => {
    if (!scrollContainer.current || !scrollContent.current) return

    const observer = new MutationObserver((mutationsList, observer) => {
      const containerHeightChanged = mutationsList.some(mutation => {
        return mutation.type === 'childList' && mutation.target === scrollContent.current
      })

      if (containerHeightChanged) {
        scrollToBottom()
      }
    })
    observer.observe(scrollContent.current, { childList: true, subtree: true })
    scrollToBottom()
  }, [scrollToBottom])

  React.useEffect(() => {
    if (!scrollContainer.current) return

    const onScroll = e => {
      const scrollBottom = e.target.scrollTop + e.target.clientHeight
      const scrollHeight = Math.ceil(e.target.scrollHeight - 1)

      if (scrollBottom < scrollHeight) {
        pinnedScroll.current = false
      } else if (scrollBottom >= scrollHeight) {
        pinnedScroll.current = true
      }
    }

    scrollContainer.current.addEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={classes.console} ref={scrollContainer}>
      <div className={classes.logLines}>
        <table>
          <tbody ref={scrollContent}>
            {logs.map((logLine, index) => {
              if (logLine) {
                return <LogLine key={index} logLine={logLine} />
              }

              return null
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function formatLogData(logData: string): LogLine[] {
  const microTimestampPattern = /\x1B\[[0-9;]*[a-zA-Z]/g
  const logLines: string[] = logData.split('\n')
  const formattedLogs = logLines?.map(line => {
    const [service, timestamp, ...rest] = line.split(' ')
    return {
      service,
      timestamp: timestamp,
      message: rest.join(' ').trim().replace(microTimestampPattern, ''),
    }
  })

  return formattedLogs
}
