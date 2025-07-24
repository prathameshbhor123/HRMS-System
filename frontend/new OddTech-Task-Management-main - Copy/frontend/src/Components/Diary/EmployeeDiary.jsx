// import React, { useState } from 'react';

// const EmployeeDiary = () => {
//     const [entries, setEntries] = useState([
//         {
//             id: 1,
//             title: 'Daily Standup',
//             content: 'Attended team standup, discussed blockers on login API.',
//             date: new Date().toLocaleString(),
//         },
//         {
//             id: 2,
//             title: 'Bug Fixing',
//             content: 'Resolved the dashboard rendering issue in the HRMS project.',
//             date: new Date().toLocaleString(),
//         },
//     ]);

//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');

//     // Add new diary entry
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!title || !content) return;

//         const newEntry = {
//             id: Date.now(),
//             title,
//             content,
//             date: new Date().toLocaleString(),
//         };

//         setEntries([newEntry, ...entries]);
//         setTitle('');
//         setContent('');
//     };

//     // Delete diary entry
//     const handleDelete = (id) => {
//         const filtered = entries.filter((entry) => entry.id !== id);
//         setEntries(filtered);
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-4">
//             <h2 className="text-3xl font-bold mb-4">📘 My Diary</h2>

//             {/* Add Entry Form */}
//             <form onSubmit={handleSubmit} className="mb-6">
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     className="border border-gray-300 p-2 rounded w-full mb-2"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                 />
//                 <textarea
//                     placeholder="What's on your mind?"
//                     className="border border-gray-300 p-2 rounded w-full mb-2"
//                     rows="4"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Add Entry
//                 </button>
//             </form>

//             {/* Display Entries */}
//             <h3 className="text-xl font-semibold mb-3">📜 Previous Entries</h3>
//             {entries.length === 0 ? (
//                 <p>No diary entries found.</p>
//             ) : (
//                 entries.map((entry) => (
//                     <div
//                         key={entry.id}
//                         className="bg-white shadow-md border p-4 rounded mb-4"
//                     >
//                         <div className="flex justify-between items-center">
//                             <h4 className="text-lg font-bold">{entry.title}</h4>
//                             <button
//                                 onClick={() => handleDelete(entry.id)}
//                                 className="text-red-500 hover:underline text-sm"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                         <p className="text-sm text-gray-500 mb-2">{entry.date}</p>
//                         <p>{entry.content}</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default EmployeeDiary;





import { useState, useEffect } from 'react';

const EmployeeDiary = () => {
    const [entries, setEntries] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentEntry, setCurrentEntry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mood icons mapping
    const moodIcons = {
        happy: '😊',
        neutral: '😐',
        sad: '😔',
        tired: '😴',
        excited: '😃'
    };

    // Mock data - replace with API calls later
    useEffect(() => {
        const fetchEntries = async () => {
            // Mock data
            setTimeout(() => {
                setEntries([
                    {
                        id: 1,
                        date: '2023-05-15',
                        title: 'Project Kickoff',
                        content: 'Started work on the new client project. Team seems excited about the challenge!',
                        mood: 'happy',
                        tags: ['work', 'project']
                    },
                    {
                        id: 2,
                        date: '2023-05-16',
                        title: 'Design Review',
                        content: 'Presented initial designs to the team. Got some great feedback to iterate on.',
                        mood: 'neutral',
                        tags: ['design', 'meeting']
                    },
                    {
                        id: 3,
                        date: '2023-05-17',
                        title: 'Code Refactoring',
                        content: 'Spent the day cleaning up legacy code. Not glamorous but necessary work.',
                        mood: 'tired',
                        tags: ['coding', 'refactor']
                    }
                ]);
                setIsLoading(false);
            }, 500);
        };

        fetchEntries();
    }, []);

    const handleAddEntry = (entry) => {
        const newEntry = {
            ...entry,
            id: entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1,
            date: new Date().toISOString().split('T')[0]
        };
        setEntries([newEntry, ...entries]);
        setIsFormOpen(false);
    };

    const handleUpdateEntry = (updatedEntry) => {
        setEntries(entries.map(entry =>
            entry.id === updatedEntry.id ? updatedEntry : entry
        ));
        setIsFormOpen(false);
        setCurrentEntry(null);
    };

    const handleDeleteEntry = (id) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    // Stats calculation
    const moodCounts = entries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
    }, {});

    const tagCounts = entries.flatMap(entry => entry.tags).reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});

    const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Entry Form Component
    const DiaryEntryForm = ({ entry, onSave, onCancel }) => {
        const [formData, setFormData] = useState({
            title: '',
            content: '',
            mood: 'neutral',
            tags: []
        });
        const [newTag, setNewTag] = useState('');

        useEffect(() => {
            if (entry) {
                setFormData({
                    title: entry.title,
                    content: entry.content,
                    mood: entry.mood,
                    tags: [...entry.tags]
                });
            }
        }, [entry]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleAddTag = () => {
            if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, newTag.trim()]
                }));
                setNewTag('');
            }
        };

        const handleRemoveTag = (tagToRemove) => {
            setFormData(prev => ({
                ...prev,
                tags: prev.tags.filter(tag => tag !== tagToRemove)
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(entry ? { ...formData, id: entry.id } : formData);
        };

        return (
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-300 mb-6">
                <h2 className="text-xl font-bold text-blue-700 mb-4">
                    {entry ? 'Edit Entry' : 'New Diary Entry'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-blue-800 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-blue-800 font-medium mb-2">Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="5"
                            className="w-full p-2 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-blue-800 font-medium mb-2">Mood</label>
                        <div className="flex space-x-4">
                            {['happy', 'neutral', 'sad', 'tired', 'excited'].map(mood => (
                                <label key={mood} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="mood"
                                        value={mood}
                                        checked={formData.mood === mood}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <span className="capitalize">{mood}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-blue-800 font-medium mb-2">Tags</label>
                        <div className="flex mb-2">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Add a tag"
                                className="flex-1 p-2 border-2 border-blue-200 rounded-l focus:outline-none focus:border-blue-400"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border-2 border-blue-400 text-blue-600 rounded hover:bg-blue-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {entry ? 'Update' : 'Save'} Entry
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-blue-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="bg-blue-600 text-white p-6 rounded-xl shadow-lg mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold font-comic">Employee Diary</h1>
                            <p className="text-blue-100 mt-1">Record your daily work adventures!</p>
                        </div>
                        <button
                            onClick={() => {
                                setCurrentEntry(null);
                                setIsFormOpen(true);
                            }}
                            className="mt-4 md:mt-0 bg-blue-400 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded-full shadow-md transition-all hover:scale-105"
                        >
                            + New Entry
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                        {isFormOpen && (
                            <DiaryEntryForm
                                entry={currentEntry}
                                onSave={currentEntry ? handleUpdateEntry : handleAddEntry}
                                onCancel={() => {
                                    setIsFormOpen(false);
                                    setCurrentEntry(null);
                                }}
                            />
                        )}

                        {/* Entry List */}
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : entries.length === 0 ? (
                            <div className="bg-white p-8 rounded-xl shadow-md text-center">
                                <p className="text-blue-600 text-lg">No entries yet. Add your first diary entry!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {entries.map(entry => (
                                    <div key={entry.id} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-400 hover:shadow-lg transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-blue-700">{entry.title}</h3>
                                                <p className="text-blue-500 text-sm mt-1">{entry.date}</p>
                                            </div>
                                            <span className="text-2xl">{moodIcons[entry.mood]}</span>
                                        </div>

                                        <p className="mt-3 text-gray-700">{entry.content}</p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {entry.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setCurrentEntry(entry);
                                                    setIsFormOpen(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEntry(entry.id)}
                                                className="text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stats Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
                            <h2 className="text-xl font-bold text-blue-700 mb-4">Your Diary Stats</h2>

                            <div className="mb-6">
                                <h3 className="font-medium text-blue-800 mb-2">Mood Distribution</h3>
                                <div className="space-y-2">
                                    {Object.entries(moodCounts).map(([mood, count]) => (
                                        <div key={mood} className="flex items-center">
                                            <span className="w-8 text-xl">{moodIcons[mood]}</span>
                                            <span className="capitalize flex-1">{mood}</span>
                                            <span className="bg-blue-100 text-blue-800 px-2 rounded-full">
                                                {count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium text-blue-800 mb-2">Top Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {sortedTags.length > 0 ? (
                                        sortedTags.map(([tag, count]) => (
                                            <span
                                                key={tag}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                                            >
                                                {tag} <span className="ml-1 text-xs bg-blue-200 rounded-full px-1.5">{count}</span>
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No tags yet</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-blue-100">
                                <p className="text-blue-600">
                                    <span className="font-bold">{entries.length}</span> total entries
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDiary;
