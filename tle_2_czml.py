from datetime import datetime, timedelta, timezone

import requests
import tle2czml

# Creates a file in the current directory called "orbit.czml", containing the orbits of the satelites over the next 24 hours.
# tle2czml.create_czml("tle.txt")

# You can also specify a different output path
# tle2czml.create_czml(input_file, outputfile_path="k3a_orbit.czml")

# You can specify the time range you would like to visualise
# Year, Month, Day, Hour, Minute
start_time = orig_start_time = datetime(2019, 5, 16, 0, 0, tzinfo=timezone.utc)
end_time = datetime(2019, 5, 18, 0, 0, tzinfo=timezone.utc)
day_delta = (end_time - start_time).days
time_seq = [start_time]

for i in range(day_delta):
	start_time = start_time + timedelta(days=1)
	time_seq.append(start_time)

if end_time - time_seq[-1] != timedelta(0):
	time_seq.append(end_time)

tles = requests.get("https://www.celestrak.com/NORAD/elements/active.txt").text.splitlines()

filtered = []

for i in range(0, len(tles), 3):
	if "SENTINEL-2" in tles[i]:
		filtered.extend(map(str.rstrip, tles[i:i + 3]))

tle2czml.create_czml(tle_array=filtered, start_time=orig_start_time, end_time=end_time, time_list=time_seq)
