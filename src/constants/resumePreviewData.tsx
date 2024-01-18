import { TResumeData } from '../types/TResumeData.ts';

export const resumePreviewData: TResumeData = {
  userName: 'Blackbeard',
  desiredJob: 'Flight attendant',
  profile:
    'Ahoy, ye scallywags! I be Blackbeard, the most fearsome pirate to sail the Seven Seas. I like me rum, I loves me ship and I sails under no flag but me own! With me trusty sword and cunning mind, I seek to carve me name into the annals of pirate legend.',
  photoLink: './public/pirate.png',
  info: [
    { type: 'dayOfBirth', value: 'Somewhere in 1680' },
    { type: 'city', value: 'The High Seas' },
    { type: 'languages', value: 'Pirate Speak, English' },
  ],

  contacts: [
    {
      info: 'blackbeard@pirate.com',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACg0lEQVRIS8WWjVEbQQyFfR2EDpwOkgriVBCoIKYCQgUJFYRUgDuAVBCngkAFuAPowLzPI+3odHubO4YZa2bnflbSk56kvesWR5LuSLiL2cD7/f6Dgl3aIu6d1nPXdds5SUwCNrCvcnwaAGs413r5S0EQTFOawAJ8J+vvWmst7qfKtcAvW8qjwJblbcoQOn9rcfWslrpfaX2xq+Oxf6YA7msBVIEN9E/I8ln353Jy18qiEix2n2vgA2CjF1CaCAEMUJxMEvm4keLalMn8Y7avAf+U4jcz2sjgvIYm51C8GGsk7VMmmhEZ+OkBm7N/RvEg0kazbWRzFYMwXXwdApS8j/sZOGZLY5SaVuqeiaAU2Gx9QzYr3VO2QdYZ+NEivJODs+CAUWLPR4qA/moB9klrbbo8U0/YOkioN4fMib8vwJYR1CCXUuIwyMY895gw5ytdq5nJL0HRbAgdvuUmAkcFoi7zJ2NnotVs3sm9zKzWTzmhCEwnU2OkNEJigrHaOBPxKj06mE7O9pRnMvCJz91YxBk8ARdKrRR706fzf2SqY8SZaiIm8hbVOORcR2YBc1J5c/UoTSdRz6llRNDU2Lu+BJiYKH7njJPXCSw6nnFCfJzy1wudB2Nhabqld1oHSKZrJWMfmVxinplh5ntd2yRY1bd8KmtHJqNzcBQH3iglKzo/OgeQ0YPGnZ1WdLczwP6VFvSXD03tIxG/LL0TLGZiY8arXXToOjYNUFzdH/ssxsP9v38TI9Q2X4/9CBCpU44Dp7KcZq8BizZzf31onsOvT/wQvCaIKT97uZmm4AxmPRvN+b29SN3cCuBtgFM3c0oxKvTBmDA6u1ZkkzKewu1cnaMBvwDZJkou23Cg+AAAAABJRU5ErkJggg==',
    },
    {
      info: '+1 800 PIR-RATE',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABGElEQVRIS+2XYRHCMAyFqQNwgARQAHMAEnAACgAFIAEUgAPmgKEAHDAH5T3YONi1oet2x5/krn/apF+XpLtX0/mTGYlrre1ifY4xCjxfDr+LMWb1y98LLqBXbEB4XcsAH0pBEpinXtYlfvjPAN/54iXwAUGTBuC1lHIJfAJ0jJFigyT0ACiRLXwV/JU0TfU7HegRba6gG6XXKeaXqc2lzeXMgF6nJtfphuB9UGe9nEq51FgI+JhUlJIQbB1MYAI5lKGRKI34o3FZ6+AtoIuSBDglcN9BjgZvsBnFfNVygHucBJTAsyflU/gdY5qL9bt7AjPMpxiUv66v5TrLwbI4LeQJwy4d+DaozD+fMBgshxfKGBEcCItyewAOSfof0PO0iQAAAABJRU5ErkJggg==',
    },
  ],
  experience: [
    {
      positionName: 'Captain',
      companyName: "The Queen Anne's Revenge",
      workingPeriod: '1716 - 1718',
      description:
        'Commanding the most dread pirate ship ever, brought fear to hearts, and gold to me pockets! Led a fearsome crew, engaged in epic sea battles, and amassed a legendary treasure hoard. Known for strategic brilliance and ruthless tactics.',
    },
    {
      positionName: 'First Mate',
      companyName: 'The Jolly Roger',
      workingPeriod: '1700 - 1716',
      description:
        "Served under the infamous Captain Kidd, learning the ways of the pirate's life. Mastered the art of navigation and plundering.",
    },
  ],
  education: [
    {
      speciality: 'Master of Nautical Studies',
      educationPeriod: '1690-1696',
      institution: 'Pirate Academy of the Seven Seas',
      description: 'Advanced Navigation, Looting Strategies, and Rum Connoisseurship',
    },
  ],
  skills: [
    { name: 'Swashbuckling', details: [{ level: '80' }] },
    { name: 'Buccaneering', details: [{ level: '67' }] },
    { name: 'Sea Shanties', details: [{ level: '85' }] },
    { name: 'Treasure Hunting', details: [{ level: '95' }] },
    { name: 'Sword Fighting', details: [{ level: '90' }] },
    { name: 'Jolly Roger Hoisting', details: [{ level: '73' }] },
  ],
  interests: [
    {
      name: 'Navigating the High Seas',
      icon: `data:image/png;base64,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`,
    },
    {
      name: 'Rum Tasting',
      icon: 'data:image/png;base64,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',
    },
  ],
};
