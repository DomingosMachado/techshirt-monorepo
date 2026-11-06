import styles from "./footer.module.css"

export function Footer (){
    return(
        <footer>
        <div className={styles.container}>

            <div className={styles.links}>
                <a 
                    href="https://x.com/home"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img 
                        src="data:image/png;base64,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" 
                        alt="twitter--v1"
                        target="_blank"
                    />
                </a>
                 <a 
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAER0lEQVR4nO1az48URRSugz8wCqJHuKqs4SAo3lDjTWKC8hdsjDpkpqqZzPR7M8vue1MHgSvReJTgP6CQcMJFRW/AHRAvunAFlQU9KeRVVy+zOj+qe7qnx2S+pJPOTndVva73vve9V6vUHHNUjybSLo3UNUAXNNI1jXzPID8o4pKxdDLmqgHu6LZ9qXADNC7v08jfFrXo4AvowpGYX5vYgFqt9rhB/twg/5N8Nbqtkb7QSAdld+I4frqQL6WUkrGaSLsawO9p4FMylzdI5v7MWvtYroHrS0vPaaDv/Je5r4E+iSK7TU0JUWS3GeRjGvnPdHeaTbs98070udItcS1VEUyXXjHIv/i1/GCtfSL85cSd5MU1jXaHqhga7Q4NdNO796eBLy3vc34JdD9q0141I9BoXxU300B/y33AC4lLSUyoGYMGOu6penXkg8IaKTtNM7BTmJjfdTEpbhTzgX//Xut2nzXAd2SNR5BeHDqQS3ZuN/hU2YseOD8kcZDG58BnkE8nvxMOH0iyKvID4fIyFzyRIcCHPB1/M3Qgg/ST25EJ5IHLP53eBwbprAa+nkgPvufugc/Ib/LMwPljPuCNWWvAyjsj3R/4+tBFaOC78hAibs1qQKvVekp36KgB/n28rqLfDPDSorVbss6DiFu9IXeHPpROlIfnDfCVPgF4XiN9lMoYuUzbLsjfxCUeGUWX8+QpM26deQxxRiCvpdvd6K7sD1jIG6kb50m6pmhDxJ36duL7LFrIa7mL/gNcyuJmpmhDXEwkPn8ts6DzxmwQDFK3EkPcInxgh7jTMETIb6UEUB/CZqUaklBsEtgZ1j0yf+lOb3H6hgCfcc/HvQ8zrHnwvND72MfKV1M3JPVtodgMax48VtsujE1ypRkCtO7iw9pn1ISQMbzsWP9fG+LLWgn4P4LmnrvWiGAX2aEmhEauVRbs2tPvSDkdCOmQVEa/dZEYomIlTuKVN1VORMhvpwmxGagOSpMoQsWhWfm/eotvjK34yjZEhJ5Icd+suJjFmFbLPq+BfpwJ0ThAxt8Q7aRC3Ano55mR8ZsbaHypr7BaFSaqd+hlyTNyyb1jJx/Y6U6UUljpCUpdcQ2R4ikBBJS6nSiKniyp1KWJmw/CPEKjBulrqVOcAgBad/fyt05vMU/tkq35UHE7KARpO2hk+SDbXWWDLgQG6EtP1/HMtkzHIbhlKuhjlWNqxmCATwRXpXJmJ8cKroUf0r6fErQcdwD9JccKDbB7gl6SMzufrW8ebi3vVBXjcGt556O+MJ0MflEOHvtc7FY95tdVRWiA3aOBfk0TbeZDUeH6DXmdnBQdl2BT0w3sE+JOabmQO/+I9XJmJ36ZDMZ3kvMJel8aBkWUuZvq9rZdkDzh5vDslMxNJ3MfT2+apEO7DfC5cdKj6Es7zVYC4Qh3S90g27whP4r7L4d1A3zVdfKBobFkXyjcgDnmUJnxENBE2hNO42C1AAAAAElFTkSuQmCC" 
                        alt="instagram-new--v1"
                        
                    />
                </a>
                <a 
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEuUlEQVR4nO1aW4tcRRA+ASOoMV5iFC8gKBpRfBB/gIJBBEUJURMTxURk3J3us5PZUzU7s1N1GmMiBBX1Mb6IF0hcI95ANBESRYOSGN+8PCg+iBsfgusa0QcTpWZmw06fnjnXmfVhChoGTnd1f91V9VVXj+eNZCQjGZqoen2VAl6ngZ5UQHsV8gGFfLTTDmjkPe1vvK5aNRd7/ycpTU1dUIbmuEY6rIBOaeR/kzTpq5A+U8hjvm9WLikAjbxDA88lXXxPUEi/KeTtQwekgDZppNm8AKKA+BeN4YaBAygbs0IDvRqzmJNtf6DnFDSVqoVbVS18tPUb+FkNtF/6xOh4uWTMuQMB4TcaqzXwkZ72DvyWQrqnVCotj9NljDlb+rbG9PArBfxladJcUjgIhfStcweB360grcmqW0+aGzTw+z10f1MYmLY5OU4CeK4c0IOFTCKAMNygkH53nUwQBOfln8DhEwr5RzVprvcKlgrSGo38k8tncin2MdzsAvFEdfrKwlZvz1kzVznBBLQxk8JKxVyogI/b5jSIk3D5jbLMTEKzcFd6ZcBP27vi1+h+b0iiAtroiI5PpT4Nm7EV8Nt5FzcWmEs1NNdqDB+QVka+o1qtntOrv7aimWQAqU5FyMvajX8mkK7LG2KdnAH0VS/y02Ji1hjJ65JPjPRF94Q0kxWECpq3K+D5fkzuQ/POPmvZZ1nG58kZHPm0tQt3ZQGxbdv05QrpRN90BOhUP0LVAd8dySLq9VWxk7ftt2sH5o0xZ2UBooFfcBDcvEb6Wu4oGvlgHKmWSqXlGugPS8f6BEB4h+VgH2QB0dH1s2Wi+/o5dy/RQB9aoXh7/CCkGQvILi+DiANHfCEwN2bRpZGescxrb4JB/EnmKBH1tW4gjcbqbEC4bAE5FDtIIR/rmhzDzUsOBOhhO2SnBqKBtiSeEKmqkX7tF6Ussz0hxYgEQLZYPnIsHgjQp1Z+VU8Cohw0r04KwG4TAd/af4N4Or1pAb9pRZrnkwARR84KxEe+re+akF5MTdAKaKdlWvuTAOlM+JJNpvGNZuJ4SgN9nDp5FIKy7PHvNDc0SQzFVNrJoZ1XNdfKt4Wm0FwRux5jVsgaUhNiK0O1dlUKBd4SRa0y8H2WntOJ7/FyT86bwhcFRCG9Z5ni4cSDdcAT9i7ERZZBAPEn6ZaIdUBTJVYwXq9fFE296Z1hA9F2mQh4Ti59aY90V9RZk5NjXiA+0mMRAgXamQpES5FvVrZrsV0R7GTSxC8PkHKNbtJAf1p+ejz1aZxRiOEjjlP5YbxurhkUEB+a10rJyXEam7w8opBfc5DYrJqim4sG4rezA+sO02p7vLyCiOdLtul806iFWz3PW1YAkGUK6XHnWwvwkUJKpiITjcZlGul7V4qhkD+SakdWIHIKnWe5qG7g74SgCwGxGEwkxV/EMwJIId0rTwZxQKSPMHYHgDM3U8hHCwexIHLECuj1HmAWgsFfUrLRwLsdZrJbvtm5kwPEKwN76FkscmuM1IULaTSrMXzIG6YI+0vFxfWmkbaJDqmMVLLyRBEik2d9nm6NQR5bUgB9/jCwXnZXI78hBbgzfxgAOiSXKPnW6pOkWjiSkYzEK0r+Az1Z+rmiJj8OAAAAAElFTkSuQmCC" 
                        alt="facebook-new"
                        target="_blank"
                    />
                </a>
            </div>

            <div className={styles.text}>
                <h3>
                  &copy; {new Date().getFullYear()} Techshirt. All rights reserved
                </h3>
            </div>
        </div>
        </footer>
    );
}