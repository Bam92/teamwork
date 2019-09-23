/*
* Database for employees' posts
* @author Abel Lifaefi Mbula
*/

const posts = [
    {
        id: 1,
        img_url: '../images/posts/1.png',
        title: 'What does a great software engineer look like?',
        tags: ['rwanda', 'andela'],
        message: '<p>I should nuance the following with a note: not all organisations make it easy for software engineers to do their job well.</p><p> All the advice below comes with a big caveat: if management doesn\’t do their job right, or if the organisation doesn\’t see the value of good software engineering practices, chances are you won\’t be able to be a great software engineer.</p><p> That\’s a much deeper issue, and not necessarily something you can fix (aside from changing jobs, if that\’s in the realm of possibility for you).</p><blockquote><p> Also, a lot of this advice doesn\’t apply to solo developers. Without further ado, here are a few critical soft skills I\’d expect from a great software engineer.</p></blockquote><p>You may not agree with me. You may look at programming as actions composed of sequential steps. You may look at programming as a purely logical process. You also may tell me that one of the reasons you are attracted to programming is the “step-by-step” manner that all the “bricks” may be laid down in your castle of code. You’re a builder. You excel in getting projects done, shipped, tested, and released.</p>',
        date: new Date('2019-07-21 11:04:45'),
        author: 'Sarah'
    },
    {
        id: 2,
        img_url: '../images/posts/2.jpeg',
        title: 'How to Be a Good Senior Developer',
        tags: ['#one', '#andela'],
        message: '<p>If you want to be, a really good, senior developer there\’s only one way to go about it:</p><p>Commit mistake, correct mistake, learn from mistake, share mistake—repeat.</p><p> A collection of mistakes becomes your experience and learning from experience is the key to becoming a successful senior developer. Simple, right?</p><blockquote><p>I have no special talent. I am only passionately curious.</p></blockquote><p>That said, if you’ve recently started your career as an entry-level developer, you’ll be wondering what steps you need to take to climb the career ladder. Is it simply a matter of time? Do you have to go back to school or get some advanced certification?</p><p>The best senior developers keep this disease in check. They know precisely when not to do something. They know that rewriting a library from scratch just to make it more readable, or switching to the newest framework from the older one are not always good decisions. They’re not risk-averse; they’re just careful in picking the right battles.</p>',
        date: new Date('2019-08-21 10:14:45'),
        author: 'Patience'
    },
    {
        id: 3,
        img_url: '../images/posts/3.jpeg',
        title: 'Write Better Quality Software Without Deadlines',
        tags: ['#job', '#software', '#code'],
        message: '<p>How would you write software if you had all the time in the world? Would you do anything differently to what you do now? This is a question asked in Extreme Programming.</p><p>You must have heard of the project management triangle, right? Make a triangle and on each point you have some variation of the following: cost, time, scope. You can only control two of the three. In the centre of the triangle is a dot, and as it moves towards any corner it must then move further from the others. It is a useful concept, but there is something missing.</p><p>They didn’t invent the concept, but it was the first place I saw it work, because everyone believed in it. The only person who knew the deadline was the Product Owner, and they had the integrity, conviction and authority to stick to the golden rule.</p><p>So why do I think it was important? Take this conversation:</p><blockquote><p>Boss: “How long will this feature take to deliver?”<br>You: “A week.”<br>Boss: “Not good enough!”<br>You: “Ok, a day.”</p></blockquote><p>What changed? Were you lying the first time? Did your boss inspire you to write more code in less time? You probably adjusted your estimate to make it more palatable. We’ve all done it and regretted it later.</p><p>At the company I worked for, sacrificing quality was not an option in almost every case. Where quality had to be sacrificed it was temporary, with a firm commitment to pay it back later. Although come to think of it, I can’t think of a single time I saw them resort to this.</p>',
        date: new Date('2019-08-21 11:04:55'),
        author: 'Sarah'
    },
    {
        id: 4,
        img_url: '../images/posts/4.png',
        title: 'How to Learn Something New ',
        tags: ['#school', '#study'],
        message: '<p>To be successful today – in a world that is changing fast – we need to be able to consistently and efficiently adapt and grow. To achieve this we need to become a self-directed, lifelong learner. The key is discovering a love of learning. But learning doesn\’t just mean acquiring new knowledge. It\’s also about developing your skills, your attitudes, values, and your own way of being in the world.</p> <blockquote><p>I have no special talent. I am only passionately curious.</p></blockquote><p>Something else to remember when it comes to senior developers is that great ones are not only able to write solid code but also have other traits that make them desirable. A senior developer is a person who can bring in 10x more value to the company. These are developers who know how “good stuff” works and can deliver value to the customer.</p>',
        date: new Date('2019-08-22 11:04:45'),
        author: 'Fidele'
    }
];
