export function PlaceStory({ story }: { story: string }) {
  const lines = story.split('\n')
  return (
    <div className="pb-section">
      <span className="pb-label">小趣事</span>
      {lines.length > 1 ? (
        <ul className="pb-points">
          {lines.map((line) => {
            const m = line.match(/^([^：]{1,8})：(.*)$/)
            return (
              <li key={line}>
                {m ? (
                  <>
                    <b>{m[1]}</b>　{m[2]}
                  </>
                ) : (
                  line
                )}
              </li>
            )
          })}
        </ul>
      ) : (
        <p>{story}</p>
      )}
    </div>
  )
}
