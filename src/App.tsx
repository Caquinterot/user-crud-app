import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

const formSchema = z.object({
	first_name: z
		.string()
		.min(2, 'First name must be at least 2 characters long'),
	last_name: z.string().min(2, 'Last name must be at least 2 characters long'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	birthday: z.string().refine((date) => {
		const parsedDate = Date.parse(date);
		return !isNaN(parsedDate);
	}, 'Invalid date format'),
	img_url: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface User extends FormData {
	id: number;
}

// Reemplaza esta URL con tu URL de Render.com
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// READ
	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await axios.get(baseUrl);
			setUsers(res.data);
		} catch (err) {
			setError('Error loading users');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// Form setup
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			birthday: '',
			img_url: '',
		},
	});

	const onSubmit = async (dataForm: FormData): Promise<void> => {
		try {
			setLoading(true);
			setError(null);

			if (editingUser) {
				await updateUser(editingUser.id, dataForm);
				setEditingUser(null);
			} else {
				await createUser(dataForm);
			}
			reset();
			await fetchUsers(); // Refrescar lista
		} catch (err) {
			setError('Error saving user');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const createUser = async (dataForm: FormData): Promise<void> => {
		await axios.post(baseUrl, dataForm);
	};

	const updateUser = async (id: number, dataForm: FormData): Promise<void> => {
		await axios.put(`${baseUrl}/${id}`, dataForm);
	};

	const deleteUser = async (id: number): Promise<void> => {
		try {
			setLoading(true);
			setError(null);
			await axios.delete(`${baseUrl}/${id}`);
			await fetchUsers(); // Refrescar lista
		} catch (err) {
			setError('Error deleting user');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-3xl font-bold text-center mb-8">User Management</h1>

				{error && (
					<div className="max-w-sm mx-auto mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
						{error}
					</div>
				)}

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
				>
					<h2 className="text-xl font-semibold mb-4">
						{editingUser ? 'Edit User' : 'Create User'}
					</h2>

					<div className="flex flex-col gap-1 mb-4">
						<Label htmlFor="first_name">First Name</Label>
						<Input id="first_name" {...register('first_name')} />
						{errors.first_name && (
							<p className="text-red-500 text-xs mt-1">
								{errors.first_name.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1 mb-4">
						<Label htmlFor="last_name">Last Name</Label>
						<Input id="last_name" {...register('last_name')} />
						{errors.last_name && (
							<p className="text-red-500 text-xs mt-1">
								{errors.last_name.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1 mb-4">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" {...register('email')} />
						{errors.email && (
							<p className="text-red-500 text-xs mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1 mb-4">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" {...register('password')} />
						{errors.password && (
							<p className="text-red-500 text-xs mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1 mb-4">
						<Label htmlFor="birthday">Birthday</Label>
						<Input id="birthday" type="date" {...register('birthday')} />
						{errors.birthday && (
							<p className="text-red-500 text-xs mt-1">
								{errors.birthday.message}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-1 mb-4">
						<Label htmlFor="img_url">Image URL</Label>
						<div className="flex gap-2">
							<Input id="img_url" {...register('img_url')} className="flex-1" />
							<Button
								type="button"
								onClick={() =>
									setValue(
										'img_url',
										`https://avatar.iran.liara.run/public/boy?t=${Date.now()}`,
									)
								}
								className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded"
							>
								Boy
							</Button>
							<Button
								type="button"
								onClick={() =>
									setValue(
										'img_url',
										`https://avatar.iran.liara.run/public/girl?t=${Date.now()}`,
									)
								}
								className="bg-pink-500 hover:bg-pink-600 text-white px-3 rounded"
							>
								Girl
							</Button>
						</div>
						{errors.img_url && (
							<p className="text-red-500 text-xs mt-1">
								{errors.img_url.message}
							</p>
						)}
					</div>

					<div className="flex gap-2">
						<Button
							type="submit"
							disabled={loading}
							className={`px-4 py-2 font-semibold text-white rounded transition-colors ${
								editingUser
									? 'bg-blue-600 hover:bg-blue-700'
									: 'bg-green-600 hover:bg-green-700'
							}`}
						>
							{loading ? 'Saving...' : editingUser ? 'Update' : 'Create'}
						</Button>

						<Button
							type="button"
							onClick={() => {
								setEditingUser(null);
								reset();
							}}
							className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
						>
							Cancel
						</Button>
					</div>
				</form>

				<div className="max-w-4xl mx-auto mt-10">
					<h2 className="text-2xl font-semibold mb-4">Users</h2>

					{loading && <p className="text-gray-500">Loading...</p>}

					<div className="grid gap-4 md:grid-cols-2">
						{users.map((u) => (
							<div
								key={u.id}
								className="border p-4 rounded-lg bg-white shadow-sm"
							>
								<div className="flex items-start gap-4">
									{u.img_url && (
										<img
											src={u.img_url}
											alt={`${u.first_name} ${u.last_name}`}
											className="w-20 h-20 object-cover rounded-full"
										/>
									)}
									<div className="flex-1">
										<p className="font-semibold text-lg">
											{u.first_name} {u.last_name}
										</p>
										<p className="text-sm text-gray-600">{u.email}</p>
										<p className="text-sm text-gray-500">
											Birthday: {u.birthday}
										</p>
									</div>
								</div>
								<div className="flex gap-2 mt-4">
									<Button
										variant="outline"
										onClick={() => {
											setEditingUser(u);
											setValue('first_name', u.first_name);
											setValue('last_name', u.last_name);
											setValue('email', u.email);
											setValue('password', u.password);
											setValue('birthday', u.birthday);
											setValue('img_url', u.img_url || '');
										}}
									>
										Edit
									</Button>
									<Button
										variant="destructive"
										onClick={() => deleteUser(u.id)}
										disabled={loading}
									>
										Delete
									</Button>
								</div>
							</div>
						))}
					</div>

					{users.length === 0 && !loading && (
						<p className="text-gray-500 text-center py-8">No users found</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
